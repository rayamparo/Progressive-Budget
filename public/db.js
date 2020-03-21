indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      
const request = indexedDB.open('offlineTrans', 1);
      let db;

      request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore('pending', {autoIncrement:true});
      };
  
      request.onerror = function() {
        console.log("There was an error");
      };
  
      request.onsuccess = function() {
        db = request.result;
        tx = db.transaction('pending', "readwrite");
        store = tx.objectStore('pending');
      };

      function saveRecord(record){
        const tx = db.transaction(['pending'], 'readwrite');
        const store = tx.objectStore('pending');
        store.add(record)


        function uploadTrans(){
            const tx = db...store..
            const store =...store.
            const getAll = store.getAll();

            getAll.onsuccess = function(){
                console.log(getAll.result)
            }
        }
}
