import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import SongsInAllDownloadsList from '../../components/SongsInAllDownloadsList';
import Player from '../../components/Player';
import BackgroundImage from '../../components/BackgroundImage';

class DownloadedSongsScreen extends Component {
  render() {
    const { downloadedSongs } = this.props;
    return (
      <BackgroundImage>
        <View style={{ flex: 5 }}>
          <SongsInAllDownloadsList  data={downloadedSongs} />

        </View>
        {/* <View style={styles.playerContainer}> */}
          <Player songs={downloadedSongs}/>
        {/* </View> */}
      </BackgroundImage>
    );
  }
};

const styles = {
  playerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
};
const mapStateToProps = ({ downloads: { downloadedSongs } }) => {
  return {
    downloadedSongs,
  };
};

export default connect(mapStateToProps)(DownloadedSongsScreen);
