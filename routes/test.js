const threeSum = arr => {
  objmain = {};

  for (let i = 0; i < arr.length; i++) {
    let obj2 = {};
    console.log(obj2);
    for (let j = 0; j < arr.length; j++) {
      if (obj2[arr[j]] != undefined && i != j) {
        const currentNumber = arr[j];
        console.log(arr[j]);
        const neededValues = 0 - currentNumber;
        const index2 = obj2[neededValues];
        if (index2 != null) {
          console.log([arr[i], index2, j]);
          let sorted = [arr[i], index2, j].sort(function(a, b) {
            return a - b;
          });
          objmain[i] = sorted;
        } else {
          obj2[arr[j]] = j;
        }
      }
    }
  }
  return objmain;
};
console.log(threeSum([-1, -2, 0, 2, 1, 4]));
