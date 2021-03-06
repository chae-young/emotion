const express = require("express");
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
const cheerio = require("cheerio");

dotenv.config();

const client_id = process.env.CLIENTID;
const client_secret = process.env.CLIENTPASSWORD;

router.get("/", async (req, res, next) => {
    const options = {
        headers: {
            "X-Naver-Client-Id": client_id,
            "X-Naver-Client-Secret": client_secret,
        },
        params: {
            query: req.query.query,
            display: 20,
            filter: "large",
        },
    };
    try {
        const result = await axios(
            "https://openapi.naver.com/v1/search/image",
            options
        );
        return res.status(201).json(result.data);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/main", async (req, res, next) => {
    try {
        const result = await axios(
            "https://movie.naver.com/movie/running/current.nhn?view=list&tab=normal&order=reserve"
        );
        let crawledMovie = [];
        const $ = cheerio.load(result.data);
        const $movieList = $(".lst_detail_t1").children("li");

        $movieList.each(function (i) {
            if (i < 20) {
                let imgsizeload = $(this)
                    .find(".thumb img")
                    .attr("src")
                    .split("=");
                crawledMovie[i] = {
                    title: $(this).find(".tit a").text(),
                    img: imgsizeload[0] + "=m203_290_2",
                    star: $(this).find(".num").text(),
                    href: $(this).find(".thumb > a").attr("href"),
                };
            }
        });

        return res.status(201).json(crawledMovie);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
