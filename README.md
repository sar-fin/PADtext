# PAD Remissgenerator – Koloskopi

Webbapp för att snabbt generera PAD-remisser efter koloskopi via knappval.

## Funktioner

- Välj indikation och makroskopiska fynd via klickbara knappar
- Lägg till burkar med biopsier/polyper sekventiellt
- Karaktärisera polyper (sessil, pedunkulerad, flat, serrated), storlek i mm
- Välj kolonavsnitt per burk
- Dynamisk remisstext byggs i realtid
- Kopiera färdig text till journalsystem med ett klick

## Kom igång

```bash
npm install
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Deploy på Vercel

Anslut ditt GitHub-repo till Vercel och deploya direkt. Inga miljövariabler krävs.

## Projektstruktur

```
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   ├── page.tsx          # Huvudsida med state
│   └── globals.css       # Designsystem + globala stilar
├── components/
│   ├── IndicationPanel.tsx  # Indikation + fynd-väljare
│   ├── JarBuilder.tsx       # Formulär för ny burk
│   ├── JarList.tsx          # Lista med tillagda burkar
│   └── PreviewPanel.tsx     # Remisstext + kopieringsknapp
└── lib/
    ├── types.ts            # TypeScript-typer
    ├── constants.ts        # Statisk data (indikationer, segment m.m.)
    └── textGenerator.ts    # Logik för textgenerering
```
