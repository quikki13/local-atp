import {
  BaseObject,
  ErrCollection,
  IGamePostData,
  TourKey,
  SeasonKey,
} from "./types";

//
// onValidateForm()
//
export const onValidateForm = (values: { games: BaseObject[] }) => {
  let errors: ErrCollection = { games: [] };

  values.games.forEach((item, index) => {
    const excludedKeys = ["winner", "winner_points", "time"]; // поля, которые не нужно валидировать на пустоту
    // все инпуты должны быть заполнены
    for (let key in item) {
      if (!excludedKeys.includes(key) && !item[key]) {
        if (!errors.games[index]) {
          errors.games[index] = {};
        }
        errors.games[index][`${key}`] = "Err: empty field";
      }
    }

    // Одинаковый счет в партии быть не может
    if (
      errors.games.length &&
      !errors.games[index]["player1_score"] &&
      !errors.games[index]["player2_score"] &&
      Number(item.player1_score) === Number(item.player2_score)
    ) {
      errors.games[index]["player1_score"] = "Err: same values";
      errors.games[index]["player2_score"] = "Err: same values";
    } else if (
      (!errors.games.length || (errors.games.length && !errors.games[index])) &&
      Number(item.player1_score) === Number(item.player2_score)
    ) {
      errors.games[index] = {};

      errors.games[index]["player1_score"] = "Err: same values";
      errors.games[index]["player2_score"] = "Err: same values";
    }
  });
  return errors.games.length ? errors : {};
};

//
// onSubmit()
//
export const onSubmit = (values: { games: IGamePostData[] }) => {
  const winnerPoints = 3;

  // [season_id, tour_id, player_id, score] - такой формат требует postgres
  const toursTableData: Array<Array<string | number>> = [];
  // [season_id, player_id, score]
  const seasonsTableData: Array<Array<string | number>> = [];

  const toursHashMap = new Map<TourKey, number>();
  const seasonsHashMap = new Map<SeasonKey, number>();

  const body = values.games.map((item) => {
    const whoIsWinner = (): string => {
      return Number(item.player1_score) > Number(item.player2_score)
        ? item.player1
        : item.player2;
    };

    const winner = whoIsWinner();

    const tourKey: TourKey = `${item.season_id}-${item.tour_id}-${winner}`;
    const seasonKey: SeasonKey = `${item.season_id}-${winner}`;

    let tourTableItemIndex = toursHashMap.get(tourKey); // Получаем индекс по ключу из карты
    let seasonTableItemIndex = seasonsHashMap.get(seasonKey); // Аналогично для сезона

    //
    // Формируем таблцу по турам
    //
    if (tourTableItemIndex) {
      // если в списке уже есть айтем за игру в этом туре для игрока то просто суммируем очки
      (toursTableData[tourTableItemIndex][3] as number) += winnerPoints;
    } else {
      toursTableData.push([item.season_id, item.tour_id, winner, winnerPoints]);
      toursHashMap.set(tourKey, toursTableData.length - 1); // Сохраняем новый индекс
    }

    //
    // Формируем таблцу по сезонам
    //
    if (seasonTableItemIndex) {
      // если в списке уже есть айтем за игру в этом туре для игрока то просто суммируем очки
      (seasonsTableData[seasonTableItemIndex][2] as number) += winnerPoints;
    } else {
      seasonsTableData.push([item.season_id, winner, winnerPoints]);
      seasonsHashMap.set(seasonKey, seasonsTableData.length - 1); // Сохраняем новый индекс
    }

    return {
      ...item,
      winner_points: winnerPoints,
      winner: winner,
    };
  });

  console.log("body", body);
  console.log("toursTableData", toursTableData);
  console.log("seasonsTableData", seasonsTableData);

  // body - data for table of games
  // toursTableData/seasonsTableData - data for tables with points
};

//
// onValidateScore()
//
export const onValidateScore = (value: string) => {
  let error;
  if (typeof +value !== "number" || isNaN(+value)) {
    error = "Only numbers";
  }
  return error;
};

//
// comparePoints()
//
export const comparePoints = (
  currPlayerPoints: string,
  opponentPoints: string,
) => {
  if (
    !currPlayerPoints ||
    !opponentPoints ||
    +currPlayerPoints === +opponentPoints
  ) {
    return "indigo";
  } else {
    return +currPlayerPoints > +opponentPoints ||
      +currPlayerPoints < +opponentPoints
      ? "green"
      : "red";
  }
};
