import express from "npm:express";
import dotenv from "npm:dotenv";
import fetch from "npm:node-fetch";
dotenv.config({ path: "../.env" });

const app = express();
const port = 3001;

const VITE_DISCORD_CLIENT_ID = Deno.env.get('VITE_DISCORD_CLIENT_ID');
const DISCORD_CLIENT_SECRET = Deno.env.get('DISCORD_CLIENT_SECRET');

// Allow express to parse JSON bodies
app.use(express.json());

app.post("/api/token", async (req, res) => {
  
  // Exchange the code for an access_token
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: VITE_DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code: req.body.code,
    }),
  });

  // Retrieve the access_token from the response
  const { access_token } = await response.json();

  // Return the access_token to our client as { access_token: "..."}
  res.send({access_token});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
