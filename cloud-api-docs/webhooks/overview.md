Nav-Logo
Build with us
Docs
Blog
Resources
Developer centers
Meine Apps
Dokumente
Übersicht
Webhooks
Webhooks
Aktualisiert: 07.11.2025
In diesem Dokument werden Webhooks beschrieben und wie sie auf der WhatsApp Business-Plattform verwendet werden.
Webhooks sind HTTP-Anfragen mit JSON-Payloads, die von Meta-Servern an einen von dir bestimmten Server gesendet werden. Die WhatsApp Business-Plattform verwendet Webhooks, um dich über eingehende Nachrichten, den Status ausgehender Nachrichten und andere wichtige Informationen zu informieren, wie z. B. Änderungen an deinem Kontostatus, Upgrades der Nachrichtenfunktion und Änderungen an der Qualitätsbewertungen deiner Vorlagen.
Hier siehst du einen Webhook, der eine Nachricht beschreibt, die von einem*einer WhatsApp-Benutzer*in an ein Unternehmen gesendet wurde:
{
"object": "whatsapp_business_account",
"entry": [
{
"id": "102290129340398",
"changes": [
{
"value": {
"messaging_product": "whatsapp",
"metadata": {
"display_phone_number": "15550783881",
"phone_number_id": "106540352242922"
},
"contacts": [
{
"profile": {
"name": "Sheena Nelson"
},
"wa_id": "16505551234"
}
],
"messages": [
{
"from": "16505551234",
"id": "wamid.HBgLMTY1MDM4Nzk0MzkVAgASGBQzQTRBNjU5OUFFRTAzODEwMTQ0RgA=",
"timestamp": "1749416383",
"type": "text"
"text": {
"body": "Does it come in another color?"
}
}
]
},
"field": "messages"
}
]
}
]
}

Einen Webhook-Endpunkt erstellen
Um Webhooks zu empfangen, musst du einen Webhook-Endpunkt erstellen und konfigurieren. Im Dokument Webhook-Endpunkt erstellen erfährst du, wie du deinen eigenen Endpunkt erstellst.
Wenn du noch nicht bereit bist, deinen eigenen Endpunkt zu erstellen, kannst du einen Test-Webhook-Endpunkt erstellen, der Webhook-Payloads an die Konsole exportiert. Beachte jedoch, dass du deinen eigenen Endpunkt erstellen musst, bevor du deine App in einer Produktionsumgebung verwenden kannst.
Berechtigungen
Du benötigst die folgenden Berechtigungen, um Webhooks zu erhalten:
whatsapp_business_messaging – für messages-Webhooks
whatsapp_business_management – für alle anderen Webhooks
Wenn du ein*e direkte*r Entwickler*in bist, gewähre deiner App über deine*n Systemnutzer*in diese Berechtigungen, wenn du dein Systemtoken generierst.
Wenn du als Lösungsanbieter*in diese Berechtigungen benötigst, um deinen Unternehmenskunden entsprechende Services zur Verfügung zu stellen, musst du vor der App-Review die Genehmigung für erweiterten Zugriff auf die Berechtigungen erhalten. Erst dann können deine Unternehmenskunden deiner App während des Onboardings diese Berechtigungen erteilen.
Felder
Sobald du deinen Webhook-Endpunkt erstellt und konfiguriert hast, kannst du die folgenden Webhook-Felder abonnieren.
Name des Feldes Beschreibung
account_alerts
Der account_alerts-Webhook benachrichtigt dich über Änderungen des Messaging-Limits, des Unternehmensprofils und des Status als offizielles Unternehmenskonto einer Unternehmenstelefonnummer.
account_review_update
Der account_review_update-Webhook benachrichtigt dich, wenn ein WhatsApp-Unternehmenskonto hinsichtlich der Einhaltung unserer Richtlinien überprüft wurde.
account_update
Der account_update-Webhook benachrichtigt dich über Änderungen an der partnergeführten Unternehmensverifizierung eines WhatsApp-Unternehmenskontos, seiner Berechtigung für den Tarif für internationale Authentifizierung oder seinem Hauptgeschäftsstandort, wenn das Konto mit einem*einer Lösungsanbieter*in geteilt wird, bei Richtlinien- oder Nutzungsbedingungsverstößen oder wenn es gelöscht wird.
automatic_events
Der automatic_events-Webhook benachrichtigt dich, wenn wir ein Kauf- oder Lead-Event in einem Chat-Thread zwischen dir und einem*einer WhatsApp-Nutzer*in erkennen, der*die dir über deine Click-to-WhatsApp Ad eine Nachricht gesendet hat. Dazu musst du Berichte für automatische Events aktiviert haben.
business_capability_update
Der business_capability_update-Webhook informiert dich über Änderungen der Funktionen für WhatsApp-Unternehmenskonto oder Business-Portfolio (Messaging-Limits, Telefonnummer-Limits usw.).
history
Der history-Webhook wird verwendet, um den Chatverlauf in der WhatsApp Business-App eines Unternehmenskunden zu synchronisieren, der von einem*einer Lösungsanbieter*in freigeschaltet wurde.
message_template_components_update
Der message_template_components_update-Webhook benachrichtigt dich über Änderungen an den Komponenten einer Vorlage.
message_template_quality_update
Der message_template_quality_update-Webhook benachrichtigt dich über Änderungen an der Qualitätsbewertung einer Vorlage.
message_template_status_update
Der message_template_status_update-Webhook benachrichtigt dich über Änderungen am Status einer vorhandenen Vorlage.
messages
Der messages-Webhook beschreibt Nachrichten, die von einem*einer WhatsApp-Nutzer*in an ein Unternehmen gesendet werden, und den Status von Nachrichten, die von einem Unternehmen an eine*n WhatsApp-Nutzer*in gesendet werden.
partner_solutions
Der partner_solutions-Webhook beschreibt Änderungen am Status einer Multi-Partner-Lösung.
payment_configuration_update
Der payment_configuration_update-Webhook informiert dich über Änderungen an Zahlungskonfigurationen für die Payments API für Indien und die Payments API für Brasilien.
phone_number_name_update
Der phone_number_name_update-Webhook informiert dich über die Verifizierung des Display-Namens der Unternehmenstelefonnummer.
phone_number_quality_update
Der phone_number_quality_update-Webhook benachrichtigt dich über Änderungen an der Durchsatzrate einer Unternehmenstelefonnummer.
security
Der security-Webhook benachrichtigt dich über Änderungen an den Sicherheitseinstellungen einer Unternehmenstelefonnummer.
smb_app_state_sync
Der smb_app_state_sync-Webhook wird zum Synchronisieren von Kontakten von Nutzer*innen der WhatsApp Business-App verwendet, die über eine*n Lösungsanbieter*in freigeschaltet wurden.
smb_message_echoes
Der smb_message_echoes-Webhook benachrichtigt dich über Nachrichten, die über die WhatsApp Business-App oder ein begleitendes („verknüpftes“) Gerät von einem Unternehmenskunden gesendet wurden, der über eine*n Lösungsanbieter*in für die Cloud API freigeschaltet wurde.
template_category_update
Der template_category_update-Webhook benachrichtigt dich über Änderungen an der Kategorie einer Vorlage.
user_preferences
Der user_preferences-Webhook benachrichtigt dich über Änderungen an den Marketing-Nachrichten-Einstellungen eines*einer WhatsApp-Nutzer*in.
Webhooks überschreiben
Du kannst einen alternativen Webhook-Endpunkt für messages-Webhooks für dein WhatsApp-Unternehmenskonto (WABA) oder deine Unternehmenstelefonnummer verwenden. Dieser kann für Testzwecke nützlich sein oder wenn du als Lösungsanbieter eindeutige Webhook-Endpunkte für alle deine registrierten Kund\*innen verwenden möchtest.
In unserem Dokument zu Webhook-Überschreibungen erfährst du, wie du Webhooks überschreiben kannst.
Payload-Größe
Payload-Webhooks können bis zu 3 MB groß sein.
Fehler bei der Webhook-Auslieferung
Wenn wir eine Webhook-Anfrage an deinen Endpunkt senden und dein Server mit einem anderen HTTP-Statuscode als 200 antwortet oder wenn wir den Webhook aus einem anderen Grund nicht zustellen können, versuchen wir es so lange mit abnehmender Häufigkeit, bis die Anfrage erfolgreich ist, und zwar bis zu 7 Tage lang.
Beachte, dass Wiederholungsversuche an alle Apps gesendet werden, die Webhooks (und ihre entsprechenden Felder) für das WhatsApp Business-Konto abonniert haben. Dies kann zu doppelten Webhook-Benachrichtigungen führen.
IP-Adressen
Du kannst die IP-Adressen unserer Webhook-Server abrufen, indem du in deinem Terminal den folgenden Befehl ausführst:
whois -h whois.radb.net — '-i origin AS32934' | grep '^route' | awk '{print $2}' | sort
Wir ändern diese IP-Adressen in regelmäßigen Abständen. Wenn du also unsere Server auf der Positivliste hast, solltest du diese Liste gelegentlich neu erstellen und deine Positivliste entsprechend aktualisieren.
Problembehandlung
Wenn du keine Webhooks erhältst:
Vergewissere dich, dass dein Endpunkt Anfragen akzeptiert.
Sende eine Test-Payload an deinen Endpunkt über das Panel App-Dashboard > WhatsApp > Konfigurationen.
Stelle sicher, dass der Live-Modus für deine App aktiviert ist. Wenn deine App im Entwicklungsmodus ist, werden einige Webhooks nicht gesendet.
Mehr dazu
Siehe unseren Blogeintrag Implementierung von Webhooks mit Node.js für WhatsApp Business.
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
