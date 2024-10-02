import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const LearningPage = () => {
  const navigation = useNavigation(); // Use the useNavigation hook to get the navigation prop

  const [moduleExpanded1, setModuleExpanded1] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const toggleModule1 = () => {
    setModuleExpanded1(!moduleExpanded1);
  };

  const openVideoModal = () => {
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
  };

  const handleCloseButton = () => {
    // Add your logic for the top-right button press
    console.log('Close button pressed');
    navigation.navigate('StartUpPage'); // Use the navigation prop directly
    // ...
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCloseButton} style={styles.closeButton}>
        <Image
          source={require('../assets/buttons/terminalPageButtons/close.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      <View style={styles.whiteBox}>
        <View style={[styles.boxContainer, { position: 'absolute', top: -30, zIndex: 1, left: '10%' }]}>
          <Text style={styles.boxText}>Robot Program Modules</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openVideoModal}>
            <Text style={styles.buttonText}>Module 0: What is Programming?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleModule1}>
            <Text style={styles.buttonText}>Module 1: Learn the Basic Movements of the Robot</Text>
          </TouchableOpacity>
          {moduleExpanded1 && (
            <View>
              <TouchableOpacity style={styles.subButton} onPress={openVideoModal}>
                <Text style={styles.subButtonText}>Topic 1: Make the Robot Go Forward!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Topic 2: Make the Robot Go Backward!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Topic 3: Make the Robot Turn Right!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.subButton}>
                <Text style={styles.subButtonText}>Topic 4: Make the Robot Turn Left!</Text>
              </TouchableOpacity>
              {/* Add more sub-topics as needed */}
            </View>
          )}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Module 2: Learning Conditional Statements</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Module 3: What is Looping?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Module 4: Avoiding Objects with Obstacle Detection</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Module 5: Creating Polygons using Robot Movements</Text>
          </TouchableOpacity>
          {/* Add other modules as needed */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9AD0C2',
  },
  boxContainer: {
    backgroundColor: '#265073',
    padding: 10,
    borderRadius: 10,
    width: 300,
    height: 50,
    borderWidth: 1,
  },
  boxText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  whiteBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 380,
    height: 700,
    margin: 10,
    borderWidth: 1,
    position: 'relative',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#2D9596',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subButton: {
    backgroundColor: '#4EA1D3',
    padding: 10,
    marginVertical: 5,
    marginLeft: 20,
    borderRadius: 5,
    borderWidth: 1,
  },
  subButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  videoModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoPlayer: {
    width: '100%',
    height: 700,
    aspectRatio: 9 / 9,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LearningPage;
