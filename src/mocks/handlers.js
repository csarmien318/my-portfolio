import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:8080/api/songs", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          _id: "mockId",
          title: "mockTitle",
          artist: "mockArtist",
          album: "mockAlbum",
          songLength: "mockLength",
          releaseYear: "mockReleaseYear",
        },
      ])
    );
  }),

  rest.get("http://localhost:8080/api/songs", (req, res, ctx) => {
    return res(ctx.status(500));
  }),

  // const values = {
  //   name: "mockName",
  //   company: "mockCompany",
  //   email: "mockEmail@mock.com",
  //   message: "Mock message.",
  // };

  rest.post("http://localhost:8080/api/save", (req, res, ctx) => {
    const error = req.url.username;
    console.log(error);

    // if (error === "Test Name") {
    //   return res(
    //     ctx.status(500),
    //     ctx.json({
    //       msg: "Sorry, an internal server error has occurred",
    //     })
    //   );
    // }
    return res(
      // ctx.delay(200),
      ctx.json({
        msg: "Data has been saved!",
      })
    );
  }),

  // rest.post("http://localhost:8080/api/save", (req, res, ctx) => {
  //   const data = req.body;
  //   console.log(data);

  //   if (data.username === "Test Name") {
  //     return res(
  //       ctx.status(500),
  //       ctx.json({
  //         msg: "Sorry, an internal server error has occurred",
  //       })
  //     );
  //   }
  // }),

  rest.post("http://localhost:8080/api/auth", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ mockToken: "mockToken" }));
  }),

  rest.post("http://localhost:8080/api/auth", (req, res, ctx) => {
    return res(ctx.status(401));
  }),

  rest.post("http://localhost:8080/api/login", (req, res, ctx) => {
    const mockToken = "mockToken";
    const user = {
      username: "mockUsername",
    };
    return res(
      ctx.cookie("mockToken", mockToken, {
        expires: new Date(new Date().getTime() + 31557600000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      }),
      ctx.status(202),
      ctx.json({ user })
    );
  }),

  rest.post("http://localhost:8080/api/logout", (req, res, ctx) => {
    return res(ctx.json("mockLogout Success"));
  }),

  rest.post("http://localhost:8080/api/clear-cookies", (req, res, ctx) => {
    return res(ctx.json("mockLogout Success"));
  }),
];
