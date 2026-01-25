// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  Select as RadixSelect,
  TextField,
} from "@radix-ui/themes";

import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";

import { v4 as uuidv4 } from "uuid";

import { Select } from "@/components/Select";
import { URLS } from "@/consts/common";

import { IResponseData, IResponseData as IInputsData } from "./types";

export default function Page() {
  const limitGames = 10;
  const winnerPoints = "3";

  const getInitData = (id: string) => {
    return {
      id: id,
      season_id: "",
      tour_id: "",
      time: "",
      player1: "",
      player2: "",
      player1_score: "",
      player2_score: "",
      winner: "",
      winner_points: "",
    };
  };

  const [games, setGames] = useState([getInitData(uuidv4())]);
  const [data, setData] = useState<IInputsData>({
    players: [],
    seasons: [],
    tours: {},
  });

  const getData = () => {
    fetch(`${URLS.add_games}${URLS.api}${URLS.get_data}`).then(
      async (response) => {
        // Проверяем успешность ответа

        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }
        const data: IResponseData = await response.json();
        setData(data);
      },
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const getErrorMessage = (name: string) => {
    return (
      <ErrorMessage name={name}>
        {(msg) => <div className="text-red-400 text-[14px]">{msg}</div>}
      </ErrorMessage>
    );
  };

  const comparePoints = (currPlayerPoints: string, opponentPoints: string) => {
    if (
      !currPlayerPoints ||
      !opponentPoints ||
      +currPlayerPoints === +opponentPoints
    ) {
      return "indigo";
    } else {
      return +currPlayerPoints > +opponentPoints ? "green" : "red";
    }
  };

  const validateScore = (value: string) => {
    let error;
    if (typeof +value !== "number" || isNaN(+value)) {
      error = "Only numbers";
    }
    return error;
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-green-100 w-full rounded-lg p-2 mt-2">
        На данной страничке добавляем матчи сыгранные за игровой день
      </div>

      <div className="max-w-xl">
        <Formik
          initialValues={{ games: [getInitData(uuidv4())] }}
          validate={(values) => {
            let errors = { games: [] };

            values.games.forEach((item, index) => {
              // все инпуты должны юыть заполнены
              for (let key in item) {
                if (!item[key]) {
                  if (!errors.games[index]) {
                    errors.games[index] = {};
                  }
                  errors.games[index][key] = "Err: empty field";
                }
              }

              // Одинаковый счет в партии быть не может
              if (+item.player1_score === +item.player2_score) {
                errors.games[index]["player1_score"] = "Err: same values";
                errors.games[index]["player2_score"] = "Err: same values";
              }
            });
            return errors;
          }}
          onSubmit={(values) => {
            // формируем тело запроса
            const body = values.games.map((item) => {
              const whoIsWinner = () => {
                item.player1_score > item.player2_score
                  ? item.player1
                  : item.player2;
              };

              return {
                ...item,
                winner_points: winnerPoints,
                winner: whoIsWinner(),
              };
            });
          }}
        >
          {({ values, errors }) => (
            <Form>
              <FieldArray name="games">
                {({ insert, remove, push }) => (
                  <div>
                    {values.games.map((game, index) => {
                      return (
                        <Flex
                          direction="column"
                          key={game.id}
                          gap="3"
                          className="border-2 border-sky-500 rounded-lg mt-6 p-2"
                        >
                          <Text className="font-semibold">{`Game ${index + 1}`}</Text>

                          {/* season */}
                          <div className="flex flex-row items-center gap-1.5 w-1/2">
                            <span className="text-gray-800">Season: </span>
                            <Field
                              name={`games[${index}].season_id`}
                              type="select"
                            >
                              {/* @ts-ignore */}
                              {({ field, form, meta }) => (
                                <Select
                                  label="Season"
                                  value={field.value}
                                  onValueChange={(e) => {
                                    form.setFieldValue(field.name, e);
                                  }}
                                  {...field}
                                  placeholder="Select a season"
                                >
                                  {data.seasons.map((season) => (
                                    <RadixSelect.Item
                                      key={season.id}
                                      value={season.id}
                                    >
                                      {season.name}
                                    </RadixSelect.Item>
                                  ))}
                                </Select>
                              )}
                            </Field>
                            {getErrorMessage(`[${index}].season_id`)}
                          </div>

                          {/* tour */}
                          <div className="flex flex-row items-center gap-1.5 w-1/2">
                            <span className="text-gray-800">Tour: </span>
                            <Field
                              name={`games[${index}].tour_id`}
                              label="tour"
                              className="min-w-[100px]"
                            >
                              {/* @ts-ignore */}
                              {({ field, form, meta }) => (
                                <Select
                                  label="Tour"
                                  value={field.value}
                                  onValueChange={(e) => {
                                    form.setFieldValue(field.name, e);
                                  }}
                                  {...field}
                                  placeholder="Select a season"
                                >
                                  {game.season_id &&
                                    data.tours[game.season_id].map((tour) => (
                                      <RadixSelect.Item
                                        key={tour.id}
                                        value={tour.id}
                                      >
                                        {tour.name}
                                      </RadixSelect.Item>
                                    ))}
                                </Select>
                              )}
                            </Field>
                            {getErrorMessage(`[${index}].tour_id`)}
                          </div>

                          {/* player 1 */}
                          <div
                            className="flex flex-row 
              items-center gap-1.5 max-sm:grid max-sm:grid-cols-6 max-sm:items-center 
              max-sm:p-1 max-sm:border max-sm:border-orange-300 
              max-sm:rounded-lg"
                          >
                            <span className="text-gray-800 max-sm:col-span-1 max-sm:col-start-1">
                              Player 1:{" "}
                            </span>

                            <div className="max-sm:col-span-2 max-sm:col-start-2">
                              <Field
                                className="min-w-[100px]"
                                name={`games[${index}].player1`}
                              >
                                {({ field, form, meta }) => (
                                  <Select
                                    label="Player1"
                                    value={field.value}
                                    onValueChange={(e) => {
                                      form.setFieldValue(field.name, e);
                                    }}
                                    {...field}
                                    placeholder="select a player 1"
                                  >
                                    {data.players.map((player) => (
                                      <RadixSelect.Item
                                        key={player.id}
                                        value={player.id.toString()}
                                        disabled={
                                          form.values.games[index].player1 ===
                                          player.id
                                        }
                                      >
                                        {player.name}
                                      </RadixSelect.Item>
                                    ))}
                                  </Select>
                                )}
                              </Field>
                              {getErrorMessage(`[${index}].player1`)}
                            </div>

                            <span className="text-cyan-600 sm:ml-2.5 max-sm:col-span-1 max-sm:col-start-1">
                              Points:{" "}
                            </span>
                            <Field
                              className="min-w-[100px]"
                              name={`games[${index}].player1_score`}
                              validate={validateScore}
                            >
                              {({ field, form, meta }) => (
                                <TextField.Root
                                  name="player1-points"
                                  className="max-sm:col-span-2 max-sm:col-start-2"
                                  color={comparePoints(
                                    game.player1_score,
                                    game.player2_score,
                                  )}
                                  variant="soft"
                                  placeholder="paste points"
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      field.name,
                                      e.target.value,
                                    );
                                  }}
                                  value={game.player1_score}
                                />
                              )}
                            </Field>
                            {errors?.games?.length &&
                              errors?.games[index]?.player1_score && (
                                <div className="text-red-300">
                                  {errors?.games[index].player1_score}
                                </div>
                              )}
                          </div>

                          {/* player 2 */}
                          <div
                            className="flex flex-row 
              items-center gap-1.5 max-sm:grid max-sm:grid-cols-6 max-sm:items-center 
              max-sm:p-1 max-sm:border max-sm:border-orange-300 
              max-sm:rounded-lg"
                          >
                            <span className="text-gray-800 max-sm:col-span-1 max-sm:col-start-1">
                              Player 2:{" "}
                            </span>
                            <div className="max-sm:col-span-2 max-sm:col-start-2">
                              <Field
                                className="min-w-[100px]"
                                name={`games[${index}].player2`}
                              >
                                {({ field, form, meta }) => (
                                  <Select
                                    label="Player2"
                                    value={field.value}
                                    onValueChange={(e) => {
                                      form.setFieldValue(field.name, e);
                                    }}
                                    {...field}
                                    placeholder="select a player 2"
                                  >
                                    {data.players.map((player) => (
                                      <RadixSelect.Item
                                        key={player.id}
                                        value={player.id.toString()}
                                        disabled={
                                          form.values.games[index].player1 ===
                                          player.id
                                        }
                                      >
                                        {player.name}
                                      </RadixSelect.Item>
                                    ))}
                                  </Select>
                                )}
                              </Field>
                              {getErrorMessage(`[${index}].player2`)}
                            </div>

                            <span className="text-cyan-600 sm:ml-2.5 max-sm:col-span-1 max-sm:col-start-1">
                              Points:{" "}
                            </span>
                            <Field
                              className="min-w-[100px]"
                              name={`games[${index}].player2_score`}
                              validate={validateScore}
                            >
                              {({ field, form, meta }) => (
                                <TextField.Root
                                  name="player2-points"
                                  className="max-sm:col-span-2 max-sm:col-start-2"
                                  color={comparePoints(
                                    game.player1_score,
                                    game.player2_score,
                                  )}
                                  variant="soft"
                                  placeholder="paste points"
                                  onChange={(e) => {
                                    form.setFieldValue(
                                      field.name,
                                      e.target.value,
                                    );
                                  }}
                                  value={game.player2_score}
                                />
                              )}
                            </Field>
                            {errors?.games?.length &&
                              errors?.games[index]?.player2_score && (
                                <div className="text-red-300">
                                  {errors?.games[index].player2_score}
                                </div>
                              )}
                          </div>

                          <div className="flex justify-end">
                            <Button
                              color="ruby"
                              disabled={values.games.length === 1}
                              onClick={() => remove(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        </Flex>
                      );
                    })}

                    {
                      <Flex direction="column" gap="2" className="mt-4">
                        {limitGames > values.games.length && (
                          <Button onClick={() => push(getInitData(uuidv4()))}>
                            Add game
                          </Button>
                        )}
                        <Button color="green" type="submit">
                          Save
                        </Button>
                      </Flex>
                    }
                  </div>

                  // }
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
