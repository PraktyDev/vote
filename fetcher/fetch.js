import fs from 'fs'

async function firstApiCall(){
    try {
        const res = await fetch("https://rest.gohighlevel.com/v1/contacts/?limit=100", {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InV2WHkxbFBrOUZERElrRmMxMmVsIiwidmVyc2lvbiI6MSwiaWF0IjoxNzM4MDc4MzkxMzAwLCJzdWIiOiJmYmVMOXdxRHdvZHpQS3d0SU5kaCJ9.Sj9Cp8U1p0HF82iLdvRLxggDN2QGHQK3iIGYftDwJ5M'
            }
        })

        const result = await res.json()
        return result.meta.total
    } catch (error) {
        console.log(error.message)
    }
}

async function main() {
  try {
    const AUTH = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InV2WHkxbFBrOUZERElrRmMxMmVsIiwidmVyc2lvbiI6MSwiaWF0IjoxNzM4MDc4MzkxMzAwLCJzdWIiOiJmYmVMOXdxRHdvZHpQS3d0SU5kaCJ9.Sj9Cp8U1p0HF82iLdvRLxggDN2QGHQK3iIGYftDwJ5M'; // keep your real token here
    let url = 'https://rest.gohighlevel.com/v1/contacts/?limit=100';
    const headers = { Authorization: AUTH };
    
    const allContacts = [];
    
    let startAfter;
    let startAfterId;



    const totalToFetch = await firstApiCall()
    const totalPages = Math.ceil(totalToFetch / 100)

    for (let page = 1; page <= totalPages; page++) {
      // build the URL with tokens once we have them
      const pageUrl = (startAfter && startAfterId)
        ? `${url}&startAfter=${startAfter}&startAfterId=${startAfterId}`
        : url;

      const res = await fetch(pageUrl, { method: 'GET', headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data = await res.json();


      allContacts.push(...data.contacts);

      // grab the next tokens—if either is missing, we’re done
      startAfter  = data.meta.startAfter;
      startAfterId = data.meta.startAfterId;
      if (!startAfter || !startAfterId) break;
    }

    console.log(`Fetched a total of ${allContacts.length} contacts.`);

    //FILTER BY CRITERIA
    const forbidden = new Set([
        "delete or stop",
        "dead",
        "archived-dnc",
        "wrong number",
        "wrong owner",
        "dnc",
        "sms failed",
        "inactive - no phone #"
    ]);

    const filteredContacts = allContacts.filter(el =>
        el.tags.includes("responded") &&
        !el.tags.some(tag => forbidden.has(tag))
    );


    console.log(`Filtered a total of ${filteredContacts.length} contacts, out of a total of ${allContacts.length} contacts.`)

    // fs.writeFileSync("filteredcontact.json", JSON.stringify(filteredContacts, null, 2), (error)=>{
    //   if(error){
    //     console.log("Error Occured")
    //   }else{
    //     console.log("File created and filtered successfully")
    //   }
    // })
    // console.log(filteredContacts)
  } catch (error) {
    console.error(error);
  }
}

main();
