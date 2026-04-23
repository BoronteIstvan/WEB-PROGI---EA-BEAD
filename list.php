async function fetchRadios() {
    try {
        const response = await fetch('list.php'); 
        const data = await response.json();
        displayRadios(data);
    } catch (error) {
        console.log("Még nincs adat vagy hiba történt.");
    }
}




