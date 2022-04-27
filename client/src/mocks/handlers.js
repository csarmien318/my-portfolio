import { rest } from "msw";
import moment from "moment";

export const handlers = [
  rest.post("http://localhost:8080/api/auth", (req, res, ctx) => {
    return res(
      ctx.cookie("accessToken", {
        expires: new Date(new Date().getTime() + 1800 * 1000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
        httpOnly: true,
      }),
      ctx.cookie("authedSession", true, {
        expires: new Date(new Date().getTime() + 1800 * 1000),
        origin: "http://localhost:3000",
        sameSite: "strict",
        secure: true,
      }),
      ctx.status(200),
      ctx.json({ mockToken: "mockToken" })
    );
  }),

  rest.post("http://localhost:8080/api/save", async (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.json({
        msg: "Data has been saved!",
      })
    );
  }),

  rest.post("http://localhost:8080/api/login", async (req, res, ctx) => {
    const user = req.body;
    console.log(user);
    const { username } = user;
    const { password } = user;

    const activeUser = JSON.stringify(user);

    if (username === "test1000" && password === "test1000test") {
      return res(
        ctx.cookie("user", activeUser, {
          origin: "http://localhost:3000",
          sameSite: "strict",
          secure: true,
        }),
        ctx.cookie("accessToken", {
          expires: new Date(new Date().getTime() + 1800 * 1000),
          origin: "http://localhost:3000",
          sameSite: "strict",
          secure: true,
          httpOnly: true,
        }),
        ctx.cookie("refreshToken", {
          expires: new Date(new Date().getTime() + 31557600000),
          origin: "http://localhost:3000",
          sameSite: "strict",
          secure: true,
          httpOnly: true,
        }),
        ctx.cookie("authedSession", true, {
          expires: new Date(new Date().getTime() + 1800 * 1000),
          origin: "http://localhost:3000",
          sameSite: "strict",
          secure: true,
        }),
        ctx.cookie("isAuthed", true, {
          expires: new Date(new Date().getTime() + 31557600000),
          origin: "http://localhost:3000",
          sameSite: "strict",
          secure: true,
        }),
        ctx.status(202),
        ctx.json({ user })
      );
    }

    return res.networkError();
  }),

  rest.get("http://localhost:8080/api/logout", async (req, res, ctx) => {
    return res(ctx.json("Logout successful"));
  }),

  rest.delete(
    "http://localhost:8080/api/clear-cookies",
    async (req, res, ctx) => {
      const expires = new Date(moment().subtract(1, "second").toDate());
      return res(
        ctx.cookie("user", undefined, { expires }),
        ctx.cookie("accessToken", undefined, { expires }),
        ctx.cookie("refreshToken", undefined, { expires }),
        ctx.cookie("authedSession", undefined, { expires }),
        ctx.cookie("isAuthed", undefined, { expires }),
        ctx.text("logout")
      );
    }
  ),

  rest.get(
    "https://api.weatherapi.com/v1/current.json",
    async (req, res, ctx) => {
      const data = {
        location: {
          name: "Test",
          region: "Test",
          country: "Test",
          lat: 25.77,
          lon: -80.19,
          tz_id: "Test",
          localtime_epoch: 1650921761,
          localtime: "9999-99-99 00:00",
        },
        current: {
          last_updated_epoch: 1650921300,
          last_updated: "9999-99-99 00:00",
          temp_c: 28.3,
          temp_f: 82.9,
          is_day: 1,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 1003,
          },
          wind_mph: 13.6,
          wind_kph: 22.0,
          wind_degree: 100,
          wind_dir: "Test",
          pressure_mb: 1019.0,
          pressure_in: 30.09,
          precip_mm: 0.0,
          precip_in: 0.0,
          humidity: 53,
          cloud: 50,
          feelslike_c: 30.4,
          feelslike_f: 86.6,
          vis_km: 16.0,
          vis_miles: 9.0,
          uv: 7.0,
          gust_mph: 16.8,
          gust_kph: 27.0,
        },
      };

      return res(ctx.json(data));
    }
  ),

  rest.get("http://localhost:8080/api/songs", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          _id: "5b21ca3eeb7f6fbccd47182b",
          title: "House Of Cards",
          artist: "Radiohead",
          album: "In Rainbows",
          songLength: "5:28",
          releaseYear: "2007",
        },
        {
          _id: "5b21ca3eeb7f6fbccd471816",
          title: "Money",
          artist: "Pink Floyd",
          album: "The Dark Side of the Moon",
          songLength: "6:22",
          releaseYear: "1973",
        },
        {
          _id: "5b21ca3eeb7f6fbccd47181e",
          title: "What Difference Does It Make?",
          artist: "The Smiths",
          album: "Hatful of Hollow",
          songLength: "3:51",
          releaseYear: "1984",
        },
        {
          _id: "5b21ca3eeb7f6fbccd471817",
          title: "Have a Cigar",
          artist: "Pink Floyd",
          album: "Wish You Were Here",
          songLength: "5:07",
          releaseYear: "1975",
        },
        {
          _id: "5b21ca3eeb7f6fbccd471822",
          title: "Morning Bell",
          artist: "Radiohead",
          album: "Kid A",
          songLength: "4:35",
          releaseYear: "2000",
        },
        {
          _id: "5b21ca3eeb7f6fbccd471819",
          title: "Wish You Were Here",
          artist: "Pink Floyd",
          album: "Wish You Were Here",
          songLength: "5:41",
          releaseYear: "1975",
        },
        {
          _id: "5b21ca3eeb7f6fbccd47181a",
          title: "Bigmouth Strikes Again",
          artist: "The Smiths",
          album: "The Queen Is Dead",
          songLength: "3:12",
          releaseYear: "1986",
        },
        {
          _id: "5b21ca3eeb7f6fbccd47182a",
          title: "Weird Fishes/Arpeggi",
          artist: "Radiohead",
          album: "In Rainbows",
          songLength: "5:18",
          releaseYear: "2007",
        },
        {
          _id: "5b21ca3eeb7f6fbccd471815",
          title: "Time",
          artist: "Pink Floyd",
          album: "The Dark Side of the Moon",
          songLength: "6:52",
          releaseYear: "1973",
        },
        {
          _id: "5b21ca3eeb7f6fbccd47181f",
          title: "Heaven Knows I'm Miserable Now",
          artist: "The Smiths",
          album: "Hatful of Hollow",
          songLength: "3:35",
          releaseYear: "1984",
        },
        {
          _id: "5b21ca3eeb7f6fbccd471821",
          title: "Optimistic",
          artist: "Radiohead",
          album: "Kid A",
          songLength: "5:15",
          releaseYear: "2000",
        },
        {
          _id: "5b21ca3eeb7f6fbccd47181b",
          title: "There Is a Light That Never Goes Out",
          artist: "The Smiths",
          album: "The Queen Is Dead",
          songLength: "4:02",
          releaseYear: "1986",
        },
      ])
    );
  }),
];
