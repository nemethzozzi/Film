# Tesztjegyzőkönyv-Bejelentkezés/Regisztráció

Az alábbi tesztdokumentum a Film Review projekthez tartozó 9.3.2 Felhasználói munkamenet funkcióihoz készült. Felelőse: Bánki Gergely 

``` 
A tesztelési dokumentáció áttekinthetőségének érdekében egy jegyzőkönyv egy adott témához tartozó funkciókat tartalmazza 
(pl. vektorműveletek) és ne az adott projekttaghoz tartozó összes funkció tesztelését belesűrítve egy fájlba.
``` 

## 1. Teszteljárások (TP)

### 1.1. Bejelentkezés funkció tesztelése 
- Azonosító: TP-01
- Tesztesetek: TC-01
- Leírás: Bejelentkezés funkció tesztelése
    0. lépés: Nyissuk meg az alkalmazást, és indítsuk el a bejelentkezés funkciót
    1. lépés: Az email szövegbeviteli mezőbe írjunk be a testuser@gmail.com címet
    2. lépés: A jelszó szövegbeviteli mezőbe írjunk be az teszteles jelszót
    3. lépés: Nyomjuk meg a bejelentkezés gombot 
    4. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a weboldal átlinkeli a felhasználót a saját profil oldalára

### 1.2. Regisztrálás funkció tesztelése
- Azonosító: TP-02
- Tesztesetek: TC-02
- Leírás: regisztráció emelés funkció tesztelése
    0. lépés: Nyissuk meg az alkalmazást, és indítsuk el a regisztráció funkciót
    1. lépés: A felhasználónév szövegbeviteli mezőbe írjunk be a PHP zoltan nevet
    1. lépés: Az email szövegbeviteli mezőbe írjunk be a php.zoltan@gmail.com címet
    1. lépés: A jelszó szövegbeviteli mezőbe írjunk be a phpzgattal jelszót
    2. lépés: Nyomjuk meg a regisztráció gombot 
    3. lépés: Ellenőrizzük az eredményt. Elvárt eredmény: a weblap átirányít a bejelenetkezés oldalra

## 2. Teszesetek (TC)

### 2.1. Bejelentkezés funkció tesztesetei

#### 2.1.1. TC-01
- TP: TP-01
- Leírás: bejelentkezés funkció tesztelése 
- Bemenet: email = testuser@gmail.com, jelszo = teszteles
- Művelet: nyomjuk meg a mentés gombot 
- Elvárt kimenet: a weblap átirányít a saját oldal lapra

### 2.2. Regisztráció funkció tesztesetei

#### 2.1.2. TC-02
- TP: TP-02
- Leírás: regisztráció funkció tesztelése 
- Bemenet: felhasználónév = PHP zoltan, születési idő = 2000.02.02, email = php.zoltan@gmail.com, jelszó = phpzgattal
- Művelet: nyomjuk meg az regisztrálok! gombot 
- Elvárt kimenet: a weboldal hibaüzenetet dob (ez az email cím már regisztrált)

## 3. Tesztriportok (TR)

### 3.1. Bejelentkezés funkció tesztriportjai

#### 3.1.1. TR-01 (TC-01)
- TP: TP-01
    1. lépés: testUser@gmail.com -ot beírtam
    2. lépés: teszteles -t beírtam 
    3. lépés: a gomb egyszeri megnyomás után inaktív lett
    4. lépés: helyes eredményt kaptam (megjelent a saját profil oldal)
    
### 3.2. Négyzetre emelés funkció tesztriportjai

#### 3.1.2. TR-02 (TC-02)
- TP: TP-01
    1. lépés: PHP zoltan nevet beírtam
    2. lépés: php.zoltan@gmail.com -ot beírtam 
    3. lépés: születési dátumot beírtam
    4. lépés: jelszót beírtam
    5. lépés: helyes eredményt kaptam (hbaüzenet, sikertelen regisztráció)

    