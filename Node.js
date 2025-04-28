const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

app.post('/submit-ticket', async (req, res) => {
    const { category, subject, description } = req.body;

    const webhookUrl = 'DEINE_WEBHOOK_URL_HIER';
    const payload = {
        embeds: [
            {
                title: "🌟 Neues Ticket erstellt! 🌟",
                color: 3447003,
                fields: [
                    { name: "📚 Kategorie", value: category || "Keine Kategorie angegeben.", inline: true },
                    { name: "📝 Betreff", value: subject || "Kein Betreff angegeben.", inline: true },
                    { name: "💬 Beschreibung", value: description || "Keine Beschreibung angegeben.", inline: false }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: "Ticket System | Vielen Dank für deine Anfrage! 😊"
                },
                author: {
                    name: "Support Team"
                }
            }
        ]
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            res.status(200).send('Ticket erfolgreich erstellt!');
        } else {
            const errorText = await response.text();
            res.status(response.status).send(`Fehler beim Erstellen des Tickets: ${errorText}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Ein Fehler ist aufgetreten: ' + error.message);
    }
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});