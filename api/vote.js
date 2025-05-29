// import { chromium } from "playwright";
import { chromium } from 'playwright-core';
import Chromium from '@sparticuz/chromium';
import { wrap, configure } from "agentql";
import dotenv from "dotenv";
// import express from "express"


dotenv.config()

// const app = express()

// app.use(express.json())

configure({ apiKey: process.env.AGENTQL_API_KEY });

const URL = "https://www.oyep.org/oyostateyouthsummit2025/vote/";


// app.get('/vote', async (req, res)=>{
//   try {
    // const isProduction = process.env.NODE_ENV === 'production';

    // const browser = await chromium.launch({
    //   executablePath: isProduction ? await Chromium.executablePath() : undefined,
    //   args: isProduction ? Chromium.args : [],
    //   headless: true,
    // });

    // const context = await browser.newContext({
    //   viewport: { width: 1280, height: 800 },
    //   ignoreHTTPSErrors: true
    // });
  
    
    // const page = await wrap(await context.newPage());
  
//     await page.goto(URL, {timeout: 180000, waitUntil: "networkidle" });
  
//     const candidateName = "Balogun Danjuma";
  
//     const radioPic = `{
//       vote_btn
//    }`
  
//      await page.waitForPageReadyState();
  
  
//     const candidateImg = await page.queryElements(`{image(Select the candidate image for ${candidateName})[]}`);
//     console.log(candidateImg)
//     if (!candidateImg) {
//       throw new Error(`Candidate image for '${candidateName}' not found.`);
//     }
    
  
//     await candidateImg.image[0].click({ force: true, delay: 1000 });
  
//     await candidateImg.image[1].click({ force: true, delay: 1000 });
  
  
  
//     const searchResponse = await page.queryElements(radioPic);
//     console.log(searchResponse)
  
//     await searchResponse.vote_btn.scrollIntoViewIfNeeded()
  
//     await searchResponse.vote_btn.click({ force: true, delay: 1000 })
  
//       // await page.waitForTimeout(4000)
  
  
//       await browser.close();
      
//       return res.status(200).json({
//         message: "Successfully voted",
//         sucess: true,
//       })
//   } catch (error) {
//     return res.status(500).json({
//       message: `Error: ${error.message}`,
//       success: false
//     })
//   }
// })

// const port = process.env.PORT || 4000

// app.listen(port, ()=>{
//   console.log(`Server listening on port ${port}`)
// })

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true
  });

  
  const page = await wrap(await context.newPage());

  await page.goto(URL, {timeout: 180000, waitUntil: "networkidle" });

  const candidateName = "Balogun Danjuma";

  const radioPic = `{
    vote_btn
 }`

   await page.waitForPageReadyState();


  const candidateImg = await page.queryElements(`{image(Select the candidate image for ${candidateName})[]}`);
  console.log(candidateImg)
  if (!candidateImg) {
    throw new Error(`Candidate image for '${candidateName}' not found.`);
  }
  

  await candidateImg.image[0].click({ force: true, delay: 1000 });

  await candidateImg.image[1].click({ force: true, delay: 1000 });



  const searchResponse = await page.queryElements(radioPic);
  console.log(searchResponse)

  await searchResponse.vote_btn.scrollIntoViewIfNeeded()

  await searchResponse.vote_btn.click({ force: true, delay: 1000 })

    // await page.waitForTimeout(4000)


  await browser.close();
}

main();
