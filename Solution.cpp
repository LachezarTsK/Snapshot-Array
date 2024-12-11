
#include <vector>
using namespace std;

class SnapshotArray {

    struct Data {
        int snapID{};
        int value{};
        Data(int snapID, int value) : snapID{snapID}, value{value}{}
    };

    vector<vector<Data>> snapshotArray;
    int snapID{};

public:
    explicit SnapshotArray(int length) {
        snapshotArray.resize(length);
        for (int i = 0; i < length; ++i) {
            snapshotArray[i] = vector<Data>();
            snapshotArray[i].emplace_back(snapID, 0);
        }
    }

    void set(int index, int value) {
        size_t lastIndex = snapshotArray[index].size() - 1;
        if (snapshotArray[index][lastIndex].snapID != snapID) {
            snapshotArray[index].emplace_back(snapID, value);
        } else {
            snapshotArray[index][lastIndex] = Data(snapID, value);
        }
    }

    int snap() {
        return snapID++;
    }

    int get(int index, int snapID) const {
        auto floorIndexSnapID = binarySearchFloor(snapshotArray[index], snapID);
        return snapshotArray[index][floorIndexSnapID].value;
    }

    int binarySearchFloor(const vector<Data>& listData, int targetSnapID) const {
        size_t left = 0;
        size_t right = listData.size() - 1;
        while (left <= right) {
            size_t middle = left + (right - left) / 2;
            if (listData[middle].snapID == targetSnapID) {
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
};
