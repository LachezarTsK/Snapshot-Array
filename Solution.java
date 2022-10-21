
import java.util.ArrayList;
import java.util.List;

public class SnapshotArray {

    private record Data(int snapID, int value){}
    private final List<Data>[] snapshotArray;
    private int snapID;

    public SnapshotArray(int length) {
        snapshotArray = new ArrayList[length];
        for (int i = 0; i < length; ++i) {
            snapshotArray[i] = new ArrayList<>();
            snapshotArray[i].add(new Data(snapID, 0));
        }
    }

    public void set(int index, int value) {
        int lastIndex = snapshotArray[index].size() - 1;
        if (snapshotArray[index].get(lastIndex).snapID != snapID) {
            snapshotArray[index].add(new Data(snapID, value));
        } else {
            snapshotArray[index].set(lastIndex, new Data(snapID, value));
        }
    }

    public int snap() {
        return snapID++;
    }

    public int get(int index, int snapID) {
        int floorIndexSnapID = binarySearchFloor(snapshotArray[index], snapID);
        return snapshotArray[index].get(floorIndexSnapID).value;
    }

    private int binarySearchFloor(List<Data> listData, int targetSnapID) {
        int left = 0;
        int right = listData.size() - 1;
        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (listData.get(middle).snapID == targetSnapID) {
                return middle;
            }
            if (listData.get(middle).snapID < targetSnapID) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
}
