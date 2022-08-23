function sort(list, name) {
  let newList = [...list];
  newList.sort(function (a, b) {
    if (a[name] < b[name]) {
      return -1;
    }
    if (a[name] > b[name]) {
      return 1;
    }
    return 0;
  });
  return newList;
}

function sortWithObject(list, name, object) {
  let newList = [...list];
  newList.sort(function (a, b) {
    if (a[object][name] < b[object][name]) {
      return -1;
    }
    if (a[object][name] > b[object][name]) {
      return 1;
    }
    return 0;
  });
  return newList;
}

function searchByFirstName(list, searchTerm) {
  let newValue = searchTerm.toLowerCase();
  return list.filter((item) => {
    let convertName = item.lastName.concat(" ", item.firstName).toLowerCase();
    return convertName.includes(newValue);
  });
}

function searchByName(list, searchTerm, name) {
  let newValue = searchTerm.toLowerCase();
  return list.filter((item) => {
    let convertName = item[name].toLowerCase();
    return convertName.includes(newValue);
  });
}

function searchWithObject(list, searchTerm, name, object) {
  let newValue = searchTerm.toLowerCase();
  return list.filter((item) => {
    let convertName = item[object][name].toLowerCase();
    return convertName.includes(newValue);
  });
}

function transfer(data, firstList, secondList, field) {
  //add new data to second list
  let newSecondList = [...secondList];
  newSecondList.push(data);

  //delete data at first list
  let newFirstList = [...firstList];
  let deleteIndex = firstList.findIndex((item) => {
    return item[field] === data[field];
  });
  newFirstList.splice(deleteIndex, 1);

  return {
    firstList: newFirstList,
    secondList: newSecondList,
  };
}

function selectOneLine(array, index) {
  array.forEach((item, itemIndex) => {
    if (itemIndex === index) {
      array[itemIndex].isSelected = !array[itemIndex].isSelected;
    } else array[itemIndex].isSelected = false;
  });
  return array;
}

function deleteSelected(array) {
  let deleteIndex = 0;
  deleteIndex = array.findIndex(item => {return item.isSelected === true});
  array.splice(deleteIndex, 1);
  return array;
}

export default {
  sort,
  sortWithObject,
  transfer,
  searchByFirstName,
  searchByName,
  searchWithObject,
  selectOneLine,
  deleteSelected,
};