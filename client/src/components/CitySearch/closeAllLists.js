const closeAllLists = (elmnt) => {
    const allAutocompleteItems = document.getElementsByClassName(
        "autocomplete-items"
    );
    for (let item of allAutocompleteItems) {
        item.parentNode.removeChild(item);
    }

    const autoCompleteList = document.getElementById("City-autocomplete-list");
    if (autoCompleteList)
        autoCompleteList.parentNode.removeChild(autoCompleteList);
};

export default closeAllLists;
