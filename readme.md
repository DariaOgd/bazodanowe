# Paperback Paradise

## 1. Charakterystyka oprogramowania
### Paperback Paradise - Portal społecznościowy do sprzedaży książek

Paperback Paradise to portal społecznościowy, którego celem jest umożliwienie użytkownikom kupna i sprzedaży książek. Platforma oferuje funkcje takie jak zakładanie profili, zarządzanie ogłoszeniami, przeglądanie i filtrowanie ofert, komunikację między użytkownikami oraz zarządzanie zamówieniami i koszykiem.

## 2. Prawa autorskie

Autorzy: Daria Ogdowska i Matylda Głazik

MIT License

Copyright (c) 2024 Daria Ogdowska, Matylda Głazik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## 3. Specyfikacja wymagań

### Priorytet:
- #1 - Wymagane
- #2 - Przydatne
- #3 - Opcjonalne

### Identyfikacja : f - funkcjonalne; nf - niefunkcjonalne

| Identyfikator | Nazwa                     | Opis                                                     | Priorytet | Kategoria         |
|---------------|---------------------------|----------------------------------------------------------|-----------|-------------------|
| 1f            | Autoryzacja               | Umożliwia użytkownikowi założenie profilu oraz logowanie  | 1         | Funkcjonalne      |
| 2f            | Zarządzanie ogłoszeniami  | Użytkownik może dodawać, edytować i usuwać ogłoszenia stworzone przez niego | 1         | Funkcjonalne      |
| 3f            | Przeglądanie ogłoszeń     | Użytkownik może przeglądać ogłoszenia na stronie głównej | 1         | Funkcjonalne      |
| 4f            | Przeglądanie szczegółów   | Użytkownik może przeglądać szczegóły ogłoszeń            | 1         | Funkcjonalne      |
| 5f            | Zarządzanie koszykiem     | Użytkownik może dodawać, usuwać i przeglądać zawartość koszyka | 1         | Funkcjonalne      |
| 6f            | Wyświetlanie informacji o koszyku | Użytkownik może zobaczyć informacje co znajduje się w koszyku | 2         | Funkcjonalne      |
| 7f            | Składanie zamówienia      | Użytkownik może złożyć zamówienie                        | 2         | Funkcjonalne      |
| 8f            | Wyświetlanie zamówień     | Użytkownik może przeglądać swoje zamówienia              | 2         | Funkcjonalne      |
| 9f            | Czat                      | Użytkownik może komunikować się ze sprzedawcami          | 3         | Funkcjonalne      |
| 10f           | Filtrowanie ogłoszeń      | Użytkownik może filtrować ogłoszenia                     | 3         | Funkcjonalne      |
| 11f           | Sortowanie ogłoszeń       | Użytkownik może sortować ogłoszenia                      | 3         | Funkcjonalne      |
| 13nf          | Graficzny interfejs       | Będzie istniał graficzny interfejs                       | 1         | Niefunkcjonalna   |
| 14nf          | Przechodzenie pomiędzy funkcjonalnościami poprzez maksymalnie 5 kliknięć | Umożliwia użytkownikowi szybkie przechodzenie między funkcjonalnościami | 2 | Niefunkcjonalna |

## 4. Architektura systemu/oprogramowania

### a. Stos technologiczny

#### Frontend:
- React
- JavaScript/JSX
- HTML/CSS
- React Router
- React Query
- Sass

#### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose

#### Narzędzia:
- Webpack
- ESLint
- Prettier

### b. Architektura uruchomieniowa

#### Struktura plików:

**Foldery główne:**
- **api**: Kod serwera aplikacji (backend).
- **client**: Kod klienta aplikacji (frontend).

**Backend (api):**
- **models**: Zawiera modele danych do interakcji z bazą danych.
- **routes**: Zawiera pliki z definicjami tras dla API.
- **controllers**: Zawiera logikę aplikacji do obsługi żądań API.
- **utils**: Zawiera pomocnicze funkcje lub moduły.
- **server.js**: Główny plik uruchamiający serwer aplikacji.

**Frontend (client):**
- **public**: Zawiera statyczne pliki publiczne (obrazy, pliki HTML, itp.).
- **src**: Główne źródło kodu frontendowego:
  - **components**: Zawiera komponenty wielokrotnego użytku.
  - **pages**: Zawiera komponenty stron aplikacji.
  - **reducers**: Zawiera reduktory stanu aplikacji.
  - **utils**: Zawiera pomocnicze funkcje lub moduły.


### Instrukcje uruchomienia

### Wymagania wstępne

Upewnij się, że masz zainstalowane następujące oprogramowanie:
- [Node.js](https://nodejs.org/) (zalecana wersja LTS)
- [MongoDB](https://www.mongodb.com/try/download/community) (lokalnie lub jako usługa chmurowa, np. MongoDB Atlas)
- [Git](https://git-scm.com/)

### Klonowanie repozytorium

Sklonuj repozytorium projektu:
```bash
git clone https://github.com/username/paperback-paradise.git
cd paperback-paradise
 Backend
Przejdź do katalogu api:

bash
Skopiuj kod
cd api
Zainstaluj zależności:

bash
Skopiuj kod
npm install
Frontend
Przejdź do katalogu client:

bash
Skopiuj kod
cd ../client
Zainstaluj zależności:

bash
Skopiuj kod
npm install
Konfiguracja środowiska
Backend
W katalogu api utwórz plik .env i skonfiguruj zmienne środowiskowe:

plaintext
Skopiuj kod
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Frontend
W katalogu client utwórz plik .env i skonfiguruj zmienne środowiskowe:

plaintext
Skopiuj kod
REACT_APP_API_URL=http://localhost:5000/api
Uruchamianie aplikacji
Backend
W katalogu api uruchom serwer:

bash
Skopiuj kod
npm start
Frontend
W katalogu client uruchom aplikację:

bash
Skopiuj kod
npm start 
## 5. Testy

### Scenariusze Testowe dla Rejestracji i Logowania Użytkownika

#### ID: TC001

#### Przypadek testowy: Logowanie użytkownika z niepoprawnymi danymi

**Opis**: 
Test sprawdza, czy system prawidłowo reaguje na próbę logowania z niepoprawnymi danymi uwierzytelniającymi, wyświetlając komunikat "Wrong password or email".

**Wymagania wstępne**:
- Aplikacja jest uruchomiona, a strona logowania jest dostępna.

**Kroki**:
1. Otwórz stronę logowania.
2. Wprowadź niepoprawny adres e-mail w polu "Email" (np. nieistniejący adres w systemie).
3. Wprowadź niepoprawne hasło w polu "Password".
4. Kliknij przycisk "Login".

*Oczekiwany wynik*:
- Wyświetla się komunikat "Wrong password or email".

---

#### ID: TC002

#### Przypadek testowy: Logowanie użytkownika z poprawnymi danymi

**Opis**: 
Test sprawdza, czy system prawidłowo reaguje na próbę logowania z poprawnymi danymi uwierzytelniającymi, przekierowując użytkownika na stronę główną.

**Wymagania wstępne**:
- Aplikacja jest uruchomiona, a strona logowania jest dostępna.
- Użytkownik o podanym adresie e-mail i haśle istnieje w systemie.

**Kroki**:
1. Otwórz stronę logowania.
2. Wprowadź poprawny adres e-mail w polu "Email".
3. Wprowadź poprawne hasło w polu "Password".
4. Kliknij przycisk "Login".

**Oczekiwany wynik**:
- Użytkownik zostaje przekierowany na stronę główną.

---

#### ID: TC003

#### Przypadek testowy: Rejestracja użytkownika z poprawnymi danymi

**Opis**: 
Test sprawdza, czy użytkownik może poprawnie zarejestrować się do systemu przy użyciu poprawnych danych, a następnie czy zostanie wyświetlony komunikat o założeniu konta i użytkownik zostanie przekierowany na stronę logowania.

**Wymagania wstępne**:
- Aplikacja jest uruchomiona, a strona rejestracji jest dostępna.
- Użytkownik o podanym adresie e-mail nie istnieje w systemie.

**Kroki**:
1. Otwórz stronę rejestracji.
2. Wprowadź poprawny adres e-mail w polu "Email".
3. Wprowadź poprawne hasło w polu "Password".
4. Wprowadź poprawne imię w polu "Name".
5. Kliknij przycisk "Sign Up".

**Oczekiwany wynik**:
- Wyświetla się komunikat "Account created!".
- Po 1 sekundzie użytkownik zostaje przekierowany na stronę logowania.
