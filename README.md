<h2>CodersLab - Warsztaty 4 - podstawy JavaScript i jQuery</h2>

Celem warsztatów jest napisanie pełnej i funkcjonalnej aplikacji frontendowej do katalogowania książek metodą REST.

Projekt składa się z dwóch części:
<ul>
    <li>Serwer – projekt napisany w ramach <a href="https://github.com/marta-krzyzewska/Warsztaty_5">Warsztatów 5</a></li>
    <li>Klient – napisany w HTML-u i JavaScripcie, komunikujący się z serwerem za pomocą AJAX.</li>
</ul>
Serwer implementuje klasę Book mającą swój identyfikator, isbn, tytuł, autora, wydawcę i gatunek.

<h4>Cel warsztatów</h4>
<ul>
    <li>Klient ma implementować tylko stronę główną.</li>
    <li>Strona ta ma pokazać wszystkie książki stworzone w systemie. Dane mają być wczytane AJAX-em z adresu /books/.</li>
    <li>Na górze tej strony ma być też formularz do tworzenia nowych książek wysyłający dane AJAX-em (metoda POST).</li>
    <li>Gdy użytkownik kliknie na nazwę książki, pod nią ma się rozwijać div z informacjami na temat tej strony wczytane za pomocą AJAX (GET) z endpointu /books/{id-książki} Div ten ma też zawierać formularz służący do edycji tej książki (AJAX, metoda PUT na endpoincie /books/{id-książki}).</li>
    <li>Obok nazwy ma się znajdować guzik służący do usuwania książki (AJAX, metoda DELETE na endpoint /books/{id-książki}).</li>
</ul>