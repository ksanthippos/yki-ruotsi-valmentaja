# YKI Ruotsi Valmentaja

YKI Ruotsi Valmentaja on Progressive Web App (PWA), joka auttaa käyttäjiä valmistautumaan ruotsin kielen yleiseen kielitutkintoon (YKI) arvosanalla hyvä. Sovellus on suunniteltu erityisesti opettajille, jotka aikovat opettaa ruotsin kielikylpyoppilaita matematiikassa ja fysiikassa.

## Ominaisuudet

- **Edistymisen seuranta**: Käyttäjät voivat seurata omaa edistymistään sanaston ja harjoitusten suorittamisessa.
- **Pelillistäminen**: Sovellus sisältää pelillisiä elementtejä, kuten pisteitä ja saavutuksia, jotka motivoivat käyttäjiä oppimaan.
- **Kielikokeeseen valmistautuminen**: Sovellus arvioi käyttäjän valmiuksia osallistua YKI-kokeeseen ja tarjoaa palautetta.
- **Erikoissanasto**: Sovellus sisältää sanastoa, joka on erityisesti suunniteltu matematiikan ja fysiikan opetukseen ruotsiksi.

## Asennusohjeet

1. **Kloonaa projekti**:
   ```bash
   git clone <repository-url>
   cd yki-ruotsi-valmentaja
   ```

2. **Asenna riippuvuudet**:
   ```bash
   npm install
   ```

3. **Käynnistä kehityspalvelin**:
   ```bash
   npm run dev
   ```

4. **Avaa selain** ja siirry osoitteeseen `http://localhost:3000` (tai muu määritetty portti).

## Versiointi

Sovelluksen versionumero löytyy tiedostosta `src/version.ts` ja näkyy etusivun
yläreunassa. Päivitä sitä jokaisessa julkaistavassa commitissa yhdellä
sadasosalla ja käytä commit-viestissä samaa numeroa, esimerkiksi:

```text
v0.01: Lisää ominaisuus
v0.02: Korjaa virhe
```

## Julkaisu GitHub Pagesiin

Projekti julkaistaan automaattisesti GitHub Pagesiin, kun muutokset pushataan
`main`-haaraan. Ota repositorion asetuksista käyttöön:

1. **Settings** -> **Pages**
2. **Build and deployment** -> **Source: GitHub Actions**

Julkaisun jälkeen sovellus löytyy osoitteesta
`https://<käyttäjänimi>.github.io/yki-ruotsi-valmentaja/`. PWA:n voi asentaa
mobiiliselaimesta tällä HTTPS-osoitteella.


## Käyttöohjeet

- **Sanastoharjoitukset**: Käyttäjät voivat selata ja harjoitella sanastoja, jotka sisältävät määritelmiä ja esimerkkejä.
- **Harjoitustehtävät**: Käyttäjät voivat suorittaa interaktiivisia harjoituksia, jotka auttavat heitä kehittämään kielitaitoaan.
- **Edistymisen seuranta**: Käyttäjät voivat tarkastella omaa edistymistään ja saada palautetta suorituksistaan.

## Tulevaisuuden kehitys

Sovellusta voidaan laajentaa lisäämällä uusia ominaisuuksia, kuten:

- Lisää harjoitustehtäviä ja sanastoja eri aiheista.
- Käyttäjäprofiilit, jotka tallentavat henkilökohtaisia tietoja ja edistymistä.
- Yhteisötoiminnot, joissa käyttäjät voivat jakaa kokemuksiaan ja oppimismateriaalejaan.

## Lisätiedot

Lisätietoja ja dokumentaatiota löytyy projektin lähdekoodista ja sen komponenteista. Voit myös osallistua kehitystyöhön ja ehdottaa parannuksia tai uusia ominaisuuksia.