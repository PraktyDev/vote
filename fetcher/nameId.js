import fs from "fs/promises" // use promise‐based API

async function slimContacts() {
  try {
    const jsonStr = await fs.readFile('filteredcontact.json', 'utf8');
    
    const allContacts = JSON.parse(jsonStr);
    
    const slimmed = allContacts.map((el) => ({ 
        contactId: el.id,
        contactName: el.contactName
     }));
    
    // 4b. (Optional) write back out to a file
    await fs.writeFile(
      'slimmedContacts.json',
      JSON.stringify(slimmed, null, 2),
      'utf8'
    );
    console.log('Written slimmedContacts.json');
  } catch (err) {
    console.error('Error:', err);
  }
}

slimContacts();
