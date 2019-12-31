import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {Actions} from 'react-native-router-flux';

export default class Pickup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        'S.No.',
        'Customer Name',
        'Mobile No',
        'Delivery Date',
        'Delivery Time',
        'Request On',
        'Delivery Status',
      ],
      tableData: [
        ['1', 'Sumit Tewari', '31254466456', '4', '312', '4', '312'],
        ['a', 'Sumit Tewari', '455c', 'd', '312', '4', '312'],
        ['1', 'Sumit Tewari', '3465', '4', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
        ['a', 'Sumit Tewari', 'c452', 'd', '312', '4', '312'],
      ],
      widthArr: [10, 120, 120, 100],
    };
  }

  _alertData(data, index) {
    Alert.alert(`${data} This is row ${index + 1}`);
    Actions.pickupDetail();
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertData(data, index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>{data}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <Table>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <ScrollView>
              {state.tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={
                        cellIndex === 1 ? element(cellData, index) : cellData
                      }
                      textStyle={styles.text}
                    />
                  ))}
                </TableWrapper>
              ))}
            </ScrollView>
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#808B97'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  btn: {height: 18, backgroundColor: '#78B7BB', borderRadius: 2},
  btnText: {textAlign: 'center', color: '#fff'},
});
