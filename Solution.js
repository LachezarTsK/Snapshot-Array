
/** 
 * @param {number} snapID 
 * @param {number} value
 */
function Data(snapID, value) {
    this.snapID = snapID;
    this.value = value;
}

class SnapshotArray {

    /**
     * @param {number} length
     */
    constructor(length) {
        this.snapID = 0;
        this.snapshotArray = new Array(length);
        for (let i = 0; i < length; ++i) {
            this.snapshotArray[i] = [];
            this.snapshotArray[i].push(new Data(this.snapID, 0));
        }
    }

    /** 
     * @param {number} index 
     * @param {number} value
     * @return {void}
     */
    set(index, value) {
        let lastIndex = this.snapshotArray[index].length - 1;
        if (this.snapshotArray[index][lastIndex].snapID !== this.snapID) {
            this.snapshotArray[index].push(new Data(this.snapID, value));
        } else {
            this.snapshotArray[index][lastIndex] = new Data(this.snapID, value);
        }
    }

    /**
     * @return {number}
     */
    snap() {
        return this.snapID++;
    }

    /** 
     * @param {number} index 
     * @param {number} snapID
     * @return {number}
     */
    get(index, snapID) {
        let floorIndexSnapID = this.binarySearchFloor(this.snapshotArray[index], snapID);
        return this.snapshotArray[index][floorIndexSnapID].value;
    }

    /** 
     * @param {number[]} listData 
     * @param {number} targetSnapID
     * @return {number}
     */
    binarySearchFloor(listData, targetSnapID) {
        let left = 0;
        let right = listData.length - 1;
        while (left <= right) {
            let middle = left + Math.floor((right - left) / 2);
            if (listData[middle].snapID === targetSnapID) {
                return middle;
            }
            if (listData[middle].snapID < targetSnapID) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
}
