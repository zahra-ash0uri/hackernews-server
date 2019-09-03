import { Router } from 'express';
import DataBase from './database';
import axios from 'axios';

const request = require('request');

const router = Router();
const apiUrl = 'https://hacker-news.firebaseio.com/v0';
const db = new DataBase();

router.get('/maxitem', async (req, res) => {
  await request(`${apiUrl}/maxitem.json`, (err, response, body) => {
    res.send(body);
  });
});


router.get('/newstoriesindex', async (req, res) => {
  await request(`${apiUrl}/newstories.json`, (err, response, body) => {
    res.send(body);
  });
});

router.get('/newstories/:id', async (req, res) => {
  const { id } = req.params;
  await request(`${apiUrl}/item/${id}.json`, (err, response, body) => {
    res.send(body);
  });
});

router.get('/beststoriesindex', async (req, res) => {
  await request(`${apiUrl}/beststories.json`, (err, response, body) => {
    res.send(body);
  });
});


router.get('/beststories/:id', async (req, res) => {
  const { id } = req.params;
  await request(`${apiUrl}/item/${id}.json`, (err, response, body) => {
    res.send(body);
  });
});

router.get('/topstoriesindex', async (req, res) => {
  await request(`${apiUrl}/topstories.json`, (err, response, body) => {
    res.send(body);
  });
});


router.get('/topstories/:id', async (req, res) => {
  const { id } = req.params;
  await request(`${apiUrl}/item/${id}.json`, (err, response, body) => {
    res.send(body);
  });
});

router.get('/askstoriesindex', async (req, res) => {
  await request(`${apiUrl}/askstories.json`, (err, response, body) => {
    res.send(body);
  });
});

router.get('/askstories/:id', async (req, res) => {
  const { id } = req.params;
  await request(`${apiUrl}/item/${id}.json`, (err, response, body) => {
    res.send(body);
  });
});

router.get('/showstoriesindex', async (req, res) => {
  await request(`${apiUrl}/showstories.json`, (err, response, body) => {
    res.send(body);
  });
});

router.get('/showstories/:id', async (req, res) => {
  const { id } = req.params;
  await request(`${apiUrl}/item/${id}.json`, (err, response, body) => {
    res.send(body);
  });

  router.get('/jobstoriesindex', async (req, res) => {
    await request(`${apiUrl}/jobstories.json`, (err, response, body) => {
      res.send(body);
    });
  });

  router.get('/jobstories/:id', async (req, res) => {
    const { id } = req.params;
    await request(`${apiUrl}/item/${id}.json`, (err, response, body) => {
      res.send(body);
    });
  });
});
//
router.get('/fetchall', async (req, res) => {
  const result = await db.insertStories();
  res.send(result);
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const result = await db.searchItems(q);
  res.send(result);
});

router.get('/stories', async (req, res) => {
  const result = await db.getStories();
  res.send(result);
});

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  await request(`${apiUrl}/user/${id}.json`, (err, response, body) => {
    res.send(body);
  });
});

export default router;
