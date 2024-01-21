function hash(s, arraySize) {
  let hashcode = 0;

  for (let i = 0; i < s.length; i++) {
    hashcode  += s.charCodeAt(i);
  }

  return hashcode % arraySize;
}

class HashMap {
  array = new Array(3333);
  numItems = 0;

  resize = () => {
    const newarray = new Array(this.array.length * 2);
    this.array.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hash(key, newarray.length);
          if (newarray[idx]) {
            newarray[idx].push([key, value]);
          } else {
            newarray[idx] = [[key, value]];
          }
        });
      }
    });
    this.array = newarray;
  };

  set = (key, value) => {
    this.numItems++;
    const loadFactor = this.numItems / this.array.length;
    if (loadFactor > 0.8) {
      // resize
      this.resize();
    }

    const idx = hash(key, this.array.length);
    if (this.array[idx]) {
      this.array[idx].push([key, value]);
    } else {
      this.array[idx] = [[key, value]];
    }
  };

  get = key => {
    const idx = hash(key, this.array.length);

    if (!this.array[idx]) {
      return null;
    }

    
    return this.array[idx].find(x => x[0] === key)[1];
  };
}
