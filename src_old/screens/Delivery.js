import React, {Component} from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StyleSheet,
  SectionList,
  Button,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        'S No.',
        'Customer Name',
        'Mobile No',
        'Delivery Date',
        'Delivery time',
        'Request On',
        'Delivery Status',
      ],
      widthArr: [40, 120, 80, 100, 120, 140, 160],
    };
  }
  goToDelivery() {
    Actions.loginScreen();
  }
  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 7; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: '#F7F6E7'},
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Delivery;
AppRegistry.registerComponent('Delivery', () => Delivery);

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
});
