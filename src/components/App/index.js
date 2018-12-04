import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

import { FirebaseContext } from '../Firebase';
import { Table, Divider, Tag } from 'antd';

const { Header, Footer, Content } = Layout;
class App extends Component {
  state = {
    groups: [],
    teams: [],
    tableData: {},
    tableSettings: {
      loading: true,
      pagination: false,
      size: 'small'
    }
  };
  componentDidMount() {
    // this.props.firebase.getTeams().then(data => {
    //   console.log(data);
    //   // this.setState({ teams: data });
    //   this.formatTeams(data);
    // });
    this.props.firebase.getGroups().then(data => {
      // console.log(data);
      console.log(data);
      this.setState({ groups: data });
      this.formatTeams(data);
    });
  }

  // formatTeams = data => {
  //   const formatted = data.map((team, index) => ({
  //     key: index,
  //     name: team.name,
  //     tags: ['winner', team.name]
  //   }));
  //   this.setState(prev => ({ data: formatted, tableSettings: { ...prev.tableSettings, loading: false } }));
  // };

  formatTeams = data => {
    // const formatted = data.map((group, index) => {
    //   return {
    //     key: index,
    //     title: group.title,
    //     teams: group.teams
    //   };
    // });

    data.map((group, index) => {
      const tableData = this.state.tableData;
      tableData[index] = [];
      group.teams.forEach((teamRef, key) => {
        teamRef.get().then(doc => {
          const { name, matches_played, won = 0, drawn = 0, lost = 0 } = doc.data();
          const team = {
            id: doc.id,
            key,
            name,
            matches_played,
            won,
            drawn,
            lost,
            pts: won * 3 + drawn
          };
          tableData[index].push(team);
          this.setState({ tableData });
          if (key === group.teams.length - 1) {
            this.setState(prev => ({ tableSettings: { ...prev.tableSettings, loading: false } }));
          }
        });
      });
      return group;
    });
  };

  render() {
    const columns = [
      {
        title: 'Team',
        dataIndex: 'name',
        key: 'name',
        render: name => name,
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: 'MP',
        dataIndex: 'matches_played',
        key: 'matches_played',
        render: mp => mp,
        sorter: (a, b) => a.matches_played - b.matches_played
      },
      {
        title: 'W',
        dataIndex: 'won',
        key: 'won',
        render: won => won,
        sorter: (a, b) => a.won - b.won
      },
      {
        title: 'D',
        dataIndex: 'drawn',
        key: 'drawn',
        render: drawn => drawn,
        sorter: (a, b) => a.drawn - b.drawn
      },
      {
        title: 'L',
        dataIndex: 'lost',
        key: 'lost',
        render: lost => lost,
        sorter: (a, b) => a.lost - b.lost
      },
      {
        title: 'GF',
        dataIndex: 'goals_for',
        key: 'goals_for',
        render: gf => gf,
        sorter: (a, b) => a.goals_for - b.goals_for
      },
      {
        title: 'GA',
        dataIndex: 'goals_against',
        key: 'goals_against',
        render: lost => lost,
        sorter: (a, b) => a.goals_against - b.goals_against
      },
      {
        title: 'GD',
        dataIndex: 'goals_diff',
        key: 'goals_diff',
        render: gd => gd,
        sorter: (a, b) => a.goals_diff - b.goals_diff
      },
      {
        title: 'Pts',
        dataIndex: 'pts',
        key: 'pts',
        render: pts => pts,
        sorter: (a, b) => a.pts - b.pts,
        defaultSortOrder: 'descend'
      }
    ];
    return (
      <Layout className="app">
        <Header className="header">
          <h1>IT Football Cup 18/19</h1>
        </Header>
        <Content className="content">
          {/* <ul>
            {this.state.groups.map(item => (
              <li key={item.title}>{item.title}</li>
            ))}
          </ul> */}
          <Row gutter={0}>
            {this.state.groups.map((group, index) => {
              return (
                <Col key={group.title} span={12}>
                  <Table
                    {...this.state.tableSettings}
                    title={() => <h3>Group {group.title}</h3>}
                    columns={columns}
                    dataSource={this.state.tableData[index]}
                  />
                </Col>
              );
            })}
          </Row>
        </Content>
        <Footer>
          <code>
            IT Football Cup ©2018 by{' '}
            <a href="https://github.com/moddi3" target="_blank" rel="noopener noreferrer">
              @moddi3
            </a>
          </code>
        </Footer>
      </Layout>
    );
  }
}

export default props => (
  <FirebaseContext.Consumer>{firebase => <App firebase={firebase} {...props} />}</FirebaseContext.Consumer>
);
