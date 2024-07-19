import express from 'express';
import next from 'next';
import axios from 'axios';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const clientId = '1259705514091347999';
const clientSecret = '7jde7Owjvo8sXF9GFhvERJ6BcX6UeQZ4';
const redirectUri = 'http://localhost:3000/api/callback';

app.prepare().then(() => {
  const server = express();

  server.get('/api/auth', (req, res) => {
    const authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify`;
    res.redirect(authorizeUrl);
  });

  server.get('/api/callback', async (req, res) => {
    const code = req.query.code as string;

    try {
      const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri
      }).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      res.json(userResponse.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        res.send(`Error: ${error.response?.status} - ${error.response?.statusText}`);
      } else if (error instanceof Error) {
        res.send(`Error: ${error.message}`);
      } else {
        res.send('An unknown error occurred.');
      }
    }
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err?: any) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
