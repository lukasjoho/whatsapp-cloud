Nav-Logo
Build with us
Docs
Blog
Resources
Developer centers
Meine Apps
Dokumente
Übersicht
Webhook-Endpunkt erstellen
Webhook-Endpunkt erstellen
Aktualisiert: 07.11.2025
Erfahre mehr über Webhook-Anfragen und -Antworten, damit du deinen eigenen Webhook-Endpunkt auf einem öffentlichen Server einrichten und konfigurieren kannst.
Bevor du deine App in einer Produktionsumgebung nutzen kannst, musst du deinen eigenen Webhook-Endpunkt auf einem öffentlichen Server erstellen und konfigurieren, der GET- und POST-Anfragen empfangen und beantworten sowie Webhook-Payloads validieren und erfassen kann.
TLS/SSL
Der Server des Webhook-Endpunkts muss über ein korrekt konfiguriertes und installiertes digitales TLS- oder SSL-Sicherheitszertifikat verfügen. Selbstsignierte Zertifikate werden nicht unterstützt.
mTLS
Webhooks unterstützen für zusätzliche Sicherheit gegenseitiges TLS (mutual TLS, mTLS). Im Dokument mTLS für Webhooks der Graph API erfährst du, wie du mTLS aktivieren und verwenden kannst.
Beachte, dass das Aktivieren und Deaktivieren von mTLS nicht auf der Ebene eines WABA oder einer Unternehmenstelefonnummer unterstützt wird. Wenn mehr als eine App auf die Plattform zugreift, musst du mTLS für jede App aktivieren.
GET-Anfragen
GET-Anfragen werden verwendet, um deinen Webhook-Endpunkt zu verifizieren. Jedes Mal, wenn du im App-Dashboard das Feld Rückruf-URL oder Verifizierungstoken festlegst oder bearbeitest, senden wir eine GET-Anfrage an deinen Webhook-Endpunkt. Du musst diese Anfrage validieren und auf sie antworten.
Anfragesyntax
GET <CALLBACK_URL>
?hub.mode=subscribe
&hub.challenge=<HUB.CHALLENGE>
&hub.verify_token=<HUB.VERIFY_TOKEN>
Anfrageparameter
Platzhalter Beschreibung Beispielwert
<CALLBACK_URL>
Die URL deines Webhook-Endpunkts
Füge diese URL im App-Dashboard im Feld Rückruf-URL hinzu, wenn du später Webhooks konfigurierst.
https://www.luckyshrub.com/webhooks
<HUB.CHALLENGE>
Ein zufälliger String, den wir generieren
1158201444
<HUB.VERIFY_TOKEN>
Ein Verifizierungs-String deiner Wahl. Speichere diesen String auf deinem Server.
Füge diesen String später beim Konfigurieren von Webhooks im Feld Verifizierungstoken im App-Dashboard hinzu.
vibecoding
Validierung
Um GET-Anfragen zu validieren, vergleiche den hub.verify_token-Wert in der Anfrage mit dem Verifizierungs-String, den du auf deinem Server gespeichert hast. Stimmen die Werte überein, ist die Anfrage gültig, andernfalls ist sie ungültig.
Antwort
Wenn die Anfrage gültig ist, antworte mit dem HTTP-Status 200 und dem hub.challenge-Wert. Wenn die Anfrage ungültig ist, antworte mit einem HTTP-Statuscode auf der 400er-Ebene oder mit einem anderen Status als 200.
Wenn du Webhooks konfigurierst, senden wir eine GET-Anfrage an deinen Webhook-Endpunkt. Wenn der Status 200 und der in der Anfrage enthaltene hub.challenge-Wert zurückgesendet werden, betrachten wir deinen Webhook-Endpunkt als verifiziert und beginnen damit, dir Webhooks zu senden. Wenn dein Webhook-Endpunkt mit einer anderen Antwort reagiert, betrachten wir deinen Webhook-Endpunkt jedoch als nicht verifiziert und es werden keine Webhooks an deinen Endpunkt gesendet.
POST-Anfragen
Jedes Mal, wenn ein Webhook-Event für Webhook-Felder ausgelöst wird, die du abonniert hast, wird eine POST-Anfrage an deinen Webhook-Endpunkt gesendet. Sie enthält eine JSON-Payload mit einer Beschreibung des Events.
Anfragesyntax
POST <CALLBACK_URL>
Content-Type: application/json
X-Hub-Signature-256: sha256=<SHA256_PAYLOAD_HASH>
Content-Length: <CONTENT_LENGTH><JSON_PAYLOAD>
Anfrageparameter
Platzhalter Beschreibung Beispielwert
<CALLBACK_URL>
Die URL deines Webhook-Endpunkts
https://www.luckyshrub.com/webhooks
<CONTENT_LENGTH>
Inhaltslänge in Byte
492
<JSON_PAYLOAD>
Post-Text-Payload, formatiert als JSON
In den Referenzen zu den Feldern findest du Beispiel-Payloads.
<SHA256_PAYLOAD_HASH>
HMAC-SHA256-Hash, berechnet aus dem Text der POST-Payload und deinem App-Geheimcode als Secret Key.
b63bb356dff0f1c24379efea2d6ef0b2e2040853339d1bcf13f9018790b1f7d2
Validierung
So validierst du die Anfrage:
Generiere einen HMAC-SHA256-Hash mit der JSON-Payload als Nachrichteneingabe und deinem App-Geheimcode als Secret Key. Vergleiche deinen generierten Hash mit dem Hash, der dem X-Hub-Signature-256-Header (alles nach sha256=) zugewiesen ist.
Stimmen die Hashes überein, ist die Payload gültig. Erfasse die Payload und verarbeite ihren Inhalt je nach Geschäftsanforderungen. Wenn sie nicht übereinstimmen, kannst du die Payload als ungültig betrachten.
Beachte, dass wir keine APIs zum Abrufen von Webhook-Verlaufsdaten anbieten. Du musst also entsprechend die Webhook-Payload erfassen und speichern.
Antwort
Wenn die Anfrage gültig ist, antworte mit dem HTTP-Status 200. Andernfalls sendest du eine Antwort mit einem HTTP-Status der 400er-Ebene oder mit einem anderen Status als 200.
Batching
POST-Anfragen werden in einem Batch mit maximal 1.000 Aktualisierungen aggregiert und gesendet. Die Zusammenfassung in Batches kann jedoch nicht garantiert werden, also passe deine Server so an, dass sie jede POST-Anfrage einzeln verarbeiten können.
Wenn eine an deinen Server gesendete POST-Anfrage fehlschlägt, wiederholen wir den Vorgang unmittelbar und starten anschließend in immer größeren Abständen innerhalb der nächsten 36 Stunden weitere Wiederholungsversuche. Dein Server sollte in diesen Fällen eine Deduplizierung durchführen können.
Antworten, die nicht innerhalb von 36 Stunden bestätigt werden, werden gelöscht.
Webhooks konfigurieren
Nachdem du deinen Webhook-Endpunkt erstellt hast, navigiere zum Bereich App-Dashboard > WhatsApp > Konfiguration und füge im Feld Rückruf-URL die URL deines Webhook-Endpunkts und im Feld Verifizierungstoken deinen Verifizierungs-String hinzu.
Hinweis: Wenn du deine App mit dem Anwendungsfall Über WhatsApp mit deinen Kunden in Kontakt treten erstellt hast, navigiere stattdessen zu App-Dashboard > Anwendungsfälle > Anpassen > Konfiguration.

Wenn dein Webhook-Endpunkt auf GET-Anfragen zur Webhook-Verifizierung korrekt antwortet, werden deine Änderungen im Bereich gespeichert und es wird eine Liste der Felder angezeigt, die du abonnieren kannst. Anschließend kannst du die Felder abonnieren, die deinen geschäftlichen Anforderungen entsprechen.
Beachte, dass du den Endpunkt POST Application Subscriptions verwenden kannst, um Webhooks als alternative Methode zu konfigurieren. Dazu ist allerdings ein App-Token erforderlich. Im Dokument Subscriptions-Edge der Graph API erfährst du, wie das geht. Verwende dabei „whatsapp_business_account“ als Objektwert.
War diese Seite hilfreich?
„Daumen hoch“-Symbol
„Daumen runter“-Symbol
Meta
FacebookInstagramXLinkedInYouTube
Build with Meta
AI
Meta Horizon
Social technologies
Wearables
News
Meta for Developers
Blog
Success stories
Support
Developer Support
Bug tool
Platform status
Developer community forum
Report an incident
About us
About
Careers
Terms and policies
Responsible platform initiatives
Platform terms
Developer policies
Privacy policy
Cookies
English (US)
