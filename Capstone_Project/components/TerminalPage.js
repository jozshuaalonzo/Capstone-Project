import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import { useNavigation } from '@react-navigation/native';
import { LayoutAnimation } from 'react-native';

const TerminalPage = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [rfidInputs, setRfidInputs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [startEndProgramModalVisible, setStartEndProgramModalVisible] = useState(false);
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [selectedImageToRemove, setSelectedImageToRemove] = useState(null);
  const [clearConfirmationModalVisible, setClearConfirmationModalVisible] = useState(false);
  const lastClickTimeRef = useRef(null);
  const [clickedImageIndex, setClickedImageIndex] = useState(null)
  // Add these lines at the beginning of the component, after importing necessary modules and declaring other states
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const textInputRef = useRef(null);
  
  const numberTextMapping = {
    '0619291971': {
      text: 'Start program',
      image: require('../assets/instructions/start_program.png'),
    },
    '0296718371': {
      text: 'End program',
      image: require('../assets/instructions/end_program.png'),
    },
    '0619600947': {
      text: 'Start Loop',
      image: require('../assets/instructions/start_loop.png'),
    },
    '0617766627': {
      text: 'End Loop',
      image: require('../assets/instructions/end_loop.png'),
    },
    '0619220099': { text: 'If', image: require('../assets/instructions/if.png') },
    '0623298067': {
      text: 'Else',
      image: require('../assets/instructions/else.png'),
    },
    '0619318179': {
      text: 'End If',
      image: require('../assets/instructions/end_if.png'),
    },
    '0618750739': {
      text: 'Forward',
      image: require('../assets/instructions/forward.png'),
    },
    '0435629539': {
      text: 'Backward',
      image: require('../assets/instructions/backward.png'),
    },
    '0624878627': {
      text: 'Turn Right',
      image: require('../assets/instructions/turn_right.png'),
    },
    '0435422851': {
      text: 'Turn Left',
      image: require('../assets/instructions/turn_left.png'),
    },
    '1365034626': {
      text: 'Stop',
      image: require('../assets/instructions/stop.png'),
    },
    '0619293587': { text: 'One', image: require('../assets/instructions/1.png') },
    '0437147523': { text: 'Two', image: require('../assets/instructions/2.png') },
    '0622660643': {
      text: 'Three',
      image: require('../assets/instructions/3.png'),
    },
    '0293694387': {
      text: 'Four',
      image: require('../assets/instructions/4.png'),
    },
    '3996473363': { text: 'Five', image: require('../assets/instructions/5.png') },
    '1365368962': { text: 'Infinity', image: require('../assets/instructions/infinity.png') },
    '1359672946': { text: 'ObstacleAhead', image: require('../assets/instructions/obstacle_ahead.png')},
    '1362825858': {
      text: '360',
      image: require('../assets/instructions/360.png'),
    },
    '0622330115': {
      text: '45',
      image: require('../assets/instructions/45.png'),
    },
    '1366603650': {
      text: '90',
      image: require('../assets/instructions/90.png'),
    },
    '1364817282': {
      text: '135',
      image: require('../assets/instructions/135.png'),
    },
    '0437137523': {
      text: '180',
      image: require('../assets/instructions/180.png'),
    },
    '0436991283': {
      text: '225',
      image: require('../assets/instructions/225.png'),
    },
    '0624927379': {
      text: '270',
      image: require('../assets/instructions/270.png'),
    },
    '1367111794': {
      text: '315',
      image: require('../assets/instructions/315.png'),
    },
  };

  // Define the mapping function
  const mapRFIDInputs = (rfidInputs) => {
    const rfidTagCodeMapping = {
      '0619291971': 'START_PROGRAM',
      '0296718371': 'END_PROGRAM',
      '0619600947': 'START_LOOP',
      '0617766627': 'END_LOOP',
      '0619220099': 'IF',
      '0623298067': 'ELSE',
      '0619318179': 'END_IF',
      '0618750739': 'FORWARD',
      '0435629539': 'BACKWARD',
      '0624878627': 'TURN_RIGHT',
      '0435422851': 'TURN_LEFT',
      '1365034626': 'STOP',
      '0619293587': 'ONE',
      '0437147523': 'TWO',
      '0622660643': 'THREE',
      '0293694387': 'FOUR',
      '3996473363': 'FIVE',
      '1365368962': 'INFINITY',
      '1359672946': 'OBSTACLE',
      '1362825858': '360',
      '0622330115': '45',
      '1366603650': '90',
      '1364817282': '135',
      '0437137523': '180',
      '0436991283': '225',
      '0624927379': '270',
      '1367111794': '315',
    };

    // Map RFID inputs
    const mappedInputs = [];
    for (let i = 0; i < rfidInputs.length; i++) {
      const rfidInput = rfidInputs[i];
      if (rfidInput === '0624878627' && rfidInputs[i + 1] === '0622330115') {
        mappedInputs.push('TURN_RIGHT45');
        i++; // Skip the next input
      }
      else if (rfidInput === '0624878627' && rfidInputs[i + 1] === '1366603650') {
          mappedInputs.push('TURN_RIGHT90');
          i++; // Skip the next input
      } 
      else if (rfidInput === '0624878627' && rfidInputs[i + 1] === '1364817282') {
        mappedInputs.push('TURN_RIGHT135');
        i++; // Skip the next input
      }
      else if (rfidInput === '0624878627' && rfidInputs[i + 1] === '0437137523') {
        mappedInputs.push('TURN_RIGHT180');
        i++; // Skip the next input
      }
      else if (rfidInput === '0624878627' && rfidInputs[i + 1] === '0436991283') {
        mappedInputs.push('TURN_RIGHT225');
        i++; // Skip the next input
      }
      else if (rfidInput === '0624878627' && rfidInputs[i + 1] === '0624927379') {
        mappedInputs.push('TURN_RIGHT270');
        i++; // Skip the next input
      }
      else if (rfidInput === '0624878627' && rfidInputs[i + 1] === '1367111794') {
        mappedInputs.push('TURN_RIGHT315');
        i++; // Skip the next input
      }
      else if (rfidInput === '0624878627' && rfidInputs[i + 1] === '1362825858') {
        mappedInputs.push('TURN_RIGHT360');
        i++; // Skip the next input
      } 

      // Turn Left and Angle

      else if (rfidInput === '0435422851' && rfidInputs[i + 1] === '0622330115') {
        mappedInputs.push('TURN_LEFT45');
        i++; // Skip the next input
      }
      else if (rfidInput === '0435422851' && rfidInputs[i + 1] === '1366603650') {
        mappedInputs.push('TURN_LEFT90');
        i++; // Skip the next input
      }
      else if (rfidInput === '0435422851' && rfidInputs[i + 1] === '1364817282') {
        mappedInputs.push('TURN_LEFT135');
        i++; // Skip the next input
      }
      else if (rfidInput === '0435422851' && rfidInputs[i + 1] === '0437137523') {
        mappedInputs.push('TURN_LEFT180');
        i++; // Skip the next input
      }
      else if (rfidInput === '0435422851' && rfidInputs[i + 1] === '0436991283') {
        mappedInputs.push('TURN_LEFT225');
        i++; // Skip the next input
      }
      else if (rfidInput === '0435422851' && rfidInputs[i + 1] === '0624927379') {
        mappedInputs.push('TURN_LEFT270');
        i++; // Skip the next input
      }
      else if (rfidInput === '0435422851' && rfidInputs[i + 1] === '1367111794') {
        mappedInputs.push('TURN_LEFT315');
        i++; // Skip the next input
      }
      else if (rfidInput === '0435422851' && rfidInputs[i + 1] === '1362825858') {
        mappedInputs.push('TURN_LEFT360');
        i++; // Skip the next input
      }
      else {
        const mappedAction = rfidTagCodeMapping[rfidInput];
        mappedInputs.push(mappedAction || 'Unknown');
      }
    }

    return mappedInputs;
  };

  const MovementToSerialMapping = {
    'FORWARD': 'F',
    'BACKWARD': 'B',
    'STOP': 'S',
    'TURN_RIGHT45': 'E',
    'TURN_RIGHT90': 'D',
    'TURN_RIGHT135': 'C',
    'TURN_RIGHT180': 'X',
    'TURN_RIGHT225': 'Z',
    'TURN_RIGHT270': 'A',
    'TURN_RIGHT315': 'Q',
    'TURN_RIGHT360': 'W',
    'TURN_LEFT45': 'U',
    'TURN_LEFT90': 'J',
    'TURN_LEFT135': 'M',
    'TURN_LEFT180': ',',
    'TURN_LEFT225': '.',
    'TURN_LEFT270': 'L',
    'TURN_LEFT315': 'O',
    'TURN_LEFT360': 'I',
  };
  
  const NumberToDelayMapping = {
    'ONE': 1,
    'TWO': 2,
    'THREE': 3,
    'FOUR': 4,
    'FIVE': 5,
  };

  const handleInputChange = (text) => {
    setTextInputValue(text);

    if (numberTextMapping[text]) {
      setRfidInputs((prevInputs) => [...prevInputs, text]);

      // Animate the new image
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      setTimeout(() => {
        setTextInputValue('');
        textInputRef.current.focus();
      }, 100);
    } else if (text.length === 10) {
      setTextInputValue('');
    }

    // After adding a new image, scroll to the bottom
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    const focusInterval = setInterval(() => {
      try {
        // Attempt to focus on the text input
        textInputRef.current.focus();
      } catch (error) {
        // Handle the error gracefully
        console.log('Error focusing on text input:', error);
      }
    }, 100); // Adjust the interval as needed (e.g., every 5 seconds)

    // Clear the interval when the component is unmounted
    return () => clearInterval(focusInterval);
  }, []); // Empty dependency array means the effect runs once after the initial render

  const handleStopPress = () => {
    // Send the character 'S' using BluetoothSerial
    BluetoothSerial.write('S').then((res) => {
      console.log('Write success:', res);
    }).catch((err) => {
      console.log('Write error:', err);
    });
  };

  const handlePlayPress = async () => {
    // Map RFID inputs
    const mappedRFIDtoCode = mapRFIDInputs(rfidInputs);

    // Log the mapped inputs
    console.log('List of Code Instructions:', mappedRFIDtoCode);

    // Define sequences for backward, turn left, and turn right
    const objBackward = ["START_PROGRAM", "IF", "OBSTACLE", "BACKWARD", "ELSE", "START_LOOP", "INFINITY", "FORWARD", "END_LOOP", "END_IF", "END_PROGRAM"];
    const objTurnLeft = ["START_PROGRAM", "IF", "OBSTACLE", "TURN_LEFT", "ELSE", "START_LOOP", "INFINITY", "FORWARD", "END_LOOP", "END_IF", "END_PROGRAM"];
    const objTurnRight = ["START_PROGRAM", "IF", "OBSTACLE", "TURN_RIGHT", "ELSE", "START_LOOP", "INFINITY", "FORWARD", "END_LOOP", "END_IF", "END_PROGRAM"];

    // Check if the sequence is equal to the specified one
    if (JSON.stringify(mappedRFIDtoCode) === JSON.stringify(objBackward)) {
        await BluetoothSerial.write('R');
        console.log('Write success:', 'R');
        return;
    }
    if (JSON.stringify(mappedRFIDtoCode) === JSON.stringify(objTurnLeft)) {
        await BluetoothSerial.write('T');
        console.log('Write success:', 'T');
        return;
    }
    if (JSON.stringify(mappedRFIDtoCode) === JSON.stringify(objTurnRight)) {
        await BluetoothSerial.write('Y');
        console.log('Write success:', 'Y');
        return;
    }

    // Check if the start program RFID value is at the first index
    if (mappedRFIDtoCode.length === 0 || mappedRFIDtoCode[0] !== 'START_PROGRAM') {
        // Display modal with alert
        setStartEndProgramModalVisible(true);
        return;
    }

    // Check if the end program RFID value is at the last index
    if (mappedRFIDtoCode.length === 0 || mappedRFIDtoCode[mappedRFIDtoCode.length - 1] !== 'END_PROGRAM') {
        // Display modal with alert
        setStartEndProgramModalVisible(true);
        return;
    }

    // Create an array to store the serial characters and delays
    const serialCharacters = [];

    // Add a variable to track the loop count
    let loopCount = 1;

    // Add a flag to check if START_LOOP is found
    let startLoopFound = false;

    // Iterate over RFID Inputs
    for (let i = 1; i < mappedRFIDtoCode.length - 1; i++) {
        const instructionCode = mappedRFIDtoCode[i];

        // Log the instruction code
        console.log(instructionCode);

        // Check if the instruction code is a movement or delay
        if (MovementToSerialMapping[instructionCode]) {
            // If it's a movement, add the corresponding serial character
            serialCharacters.push(MovementToSerialMapping[instructionCode]);
        } else if (NumberToDelayMapping[instructionCode]) {
            // If it's a delay, add the corresponding delay value in seconds
            serialCharacters.push(NumberToDelayMapping[instructionCode]);
        } else if (instructionCode === 'START_LOOP') {
            // Check if START_LOOP is present in mappedRFIDtoCode
            startLoopFound = true;

            // Find the next instruction code
            const nextInstructionCode = mappedRFIDtoCode[i + 1];

            // Check if the next instruction is a number in NumberToDelayMapping
            if (NumberToDelayMapping[nextInstructionCode]) {
                // Set the loop count based on the equivalent number
                loopCount = NumberToDelayMapping[nextInstructionCode];
                i++; // Skip the next instruction code
            }
        } else if (instructionCode === 'END_LOOP') {
            // Repeat the loop according to the loop count
            for (let j = 0; j < loopCount; j++) {
                // Send the serial characters and delays to the device or perform other actions
                for (let k = 0; k < serialCharacters.length; k++) {
                    const characterToSend = serialCharacters[k];

                    console.log(characterToSend);

                    if (typeof characterToSend === 'number') {
                        // If the character is a number, wait for the specified delay before sending the next character
                        console.log("Delay (Seconds): ", characterToSend);
                        await new Promise(resolve => setTimeout(resolve, characterToSend * 1000));

                        // After the delay, send the character 'S'
                        await BluetoothSerial.write('S');

                        await new Promise(resolve => setTimeout(resolve, 1000)); // Delay in seconds
                    } else {
                        // If it's a movement character, send it using BluetoothSerial
                        console.log("Robot Instruction: ", characterToSend);
                        await BluetoothSerial.write(characterToSend);
                    }
                }
            }

            // Reset the loop count after completing the loop
            loopCount = 1;
            // Clear the serial characters array
            serialCharacters.length = 0;
        } else {
            // Handle other instructions as needed
        }
    }

    // If START_LOOP was not found, execute the loop once
    if (!startLoopFound) {
        for (let j = 0; j < loopCount; j++) {
            // Send the serial characters and delays to the device or perform other actions
            for (let k = 0; k < serialCharacters.length; k++) {
                const characterToSend = serialCharacters[k];

                console.log(characterToSend);

                if (typeof characterToSend === 'number') {
                    // If the character is a number, wait for the specified delay before sending the next character
                    console.log("Delay (Seconds): ", characterToSend);
                    await new Promise(resolve => setTimeout(resolve, characterToSend * 1000));

                    // After the delay, send the character 'S'
                    await BluetoothSerial.write('S');

                    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay in seconds
                } else {
                    // If it's a movement character, send it using BluetoothSerial
                    console.log("Robot Instruction: ", characterToSend);
                    await BluetoothSerial.write(characterToSend);
                }
            }
        }
    }
};


  
  
  
  
  

  const handleVerifyPress = () => {
    console.log('Verify button pressed');
    console.log('RFID Inputs:', rfidInputs);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleClearPress = () => {
    console.log('Clear button pressed');
    setClearConfirmationModalVisible(true);
  };
  


  const handleConfirmClear = () => {
    // Clear the RFID inputs
    setRfidInputs([]);
    // Close the confirmation modal
    setClearConfirmationModalVisible(false);
  };
  

  const determineAlignment = (input) => {
    const controlInstructions = ['If', 'End If', 'Else', 'Start Loop', 'End Loop'];
  
    if (controlInstructions.includes(numberTextMapping[input].text)) {
      return 'center';
    } else if (input === '0619291971' || input === '0296718371') {
      return 'flex-start';
    } else {
      return 'flex-end';
    }
  };

  // New Modal for Start and End Program Alert
const closeStartEndProgramModal = () => {
  setStartEndProgramModalVisible(false);
};

const handleCloseButton = () => {
  // Add your logic for the top-right button press
  console.log('Close button pressed');
  navigation.navigate('StartUpPage')
  // ...
};

const handleMoveUp = () => {
  // Add your logic for the "Move Up" button press

  if (clickedImageIndex === null || clickedImageIndex <= 0) {
    // If no image is clicked or the clicked image is already at the top, no need to move up
    return;
  }

  const selectedIndex = clickedImageIndex; // Use the stored index of the clicked image

  // Swap the selected RFID input with the one before it
  const updatedRfidInputs = [...rfidInputs];
  [updatedRfidInputs[selectedIndex], updatedRfidInputs[selectedIndex - 1]] = [
    updatedRfidInputs[selectedIndex - 1],
    updatedRfidInputs[selectedIndex],
  ];

  setRfidInputs(updatedRfidInputs);

  // Reset the clicked image index after moving up
  setClickedImageIndex(null);
};

const handleMoveDown = () => {
  // Add your logic for the "Move Down" button press

  if (clickedImageIndex === null || clickedImageIndex >= rfidInputs.length - 1) {
    // If no image is clicked or the clicked image is already at the bottom, no need to move down
    return;
  }

  const selectedIndex = clickedImageIndex; // Use the stored index of the clicked image

  // Swap the selected RFID input with the one after it
  const updatedRfidInputs = [...rfidInputs];
  [updatedRfidInputs[selectedIndex], updatedRfidInputs[selectedIndex + 1]] = [
    updatedRfidInputs[selectedIndex + 1],
    updatedRfidInputs[selectedIndex],
  ];

  setRfidInputs(updatedRfidInputs);

  // Reset the clicked image index after moving down
  setClickedImageIndex(null);
};

const handleImageClick = (index) => {
  // Store the index of the clicked image
  setClickedImageIndex(index);

  const clickedInput = rfidInputs[index];

  // Print a message to the console when an image is clicked
  console.log(`Image clicked: RFID Input - ${clickedInput}`);

  // Get the current timestamp
  const currentTime = new Date().getTime();

  // Check if the image was clicked again within 500 milliseconds
  if (lastClickTimeRef.current && currentTime - lastClickTimeRef.current < 500) {
    // Set the selected image to be removed
    setSelectedImageToRemove(clickedInput);

    // Show the confirmation modal
    setConfirmationModalVisible(true);
  }

  // Update the last click time
  lastClickTimeRef.current = currentTime;
};

const handleConfirmRemove = () => {
  // Remove the selected RFID input and its corresponding image
  setRfidInputs((prevInputs) => prevInputs.filter((input) => input !== selectedImageToRemove));

  // Hide the confirmation modal
  setConfirmationModalVisible(false);
};

const handleCancelRemove = () => {
  // Clear the selected image to be removed
  setSelectedImageToRemove(null);

  // Hide the confirmation modal
  setConfirmationModalVisible(false);
};

return (
  <View style={styles.newPageContainer} keyboardShouldPersistTaps="never">
    <Text style={[styles.newPageText, { position: 'absolute', top: 30, zIndex: 1, left: '20%' }]}>Program Terminal</Text>
    {/* Add the touchable opacity button in the top-right corner */}
    <TouchableOpacity onPress={handleCloseButton} style={styles.closeButton}>
      <Image
        source={require('../assets/buttons/terminalPageButtons/close.png')} // Update with your button image
        style={styles.closeIcon}
      />
    </TouchableOpacity>
    <View style={{ opacity: rfidInputs.length ? 0 : 0 }}>
      <TextInput
        style={styles.input}
        placeholder="RFID ID Number"
        onChangeText={handleInputChange}
        value={textInputValue}
        ref={textInputRef}
        autoFocus={false}
        showSoftInputOnFocus={false}
      />
    </View>
    <ScrollView
        style={{ ...styles.whiteBox, flex: 1 }}
        contentContainerStyle={{ paddingBottom: 35 }}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false} // Add this line to hide the vertical scroll indicator
      >
        {rfidInputs.map((input, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageClick(index)}>
            <View style={{ alignItems: determineAlignment(input) }}>
              <Image
                source={numberTextMapping[input].image}
                style={styles.instructionImage}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    <View style={styles.buttonContainer}>
      {/* Existing four buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleMoveUp}>
          <Image
            source={require('../assets/buttons/terminalPageButtons/moveUp.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMoveDown}>
          <Image
            source={require('../assets/buttons/terminalPageButtons/moveDown.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearPress}>
          <Image
            source={require('../assets/buttons/terminalPageButtons/delete.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleVerifyPress}>
          <Image
            source={require('../assets/buttons/terminalPageButtons/compile.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* New two buttons below the existing four */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleStopPress}>
          <Image
            source={require('../assets/buttons/terminalPageButtons/stop.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPress}>
          <Image
            source={require('../assets/buttons/terminalPageButtons/start.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>

    {/* Main Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Program Input</Text>
          <ScrollView>
            {rfidInputs.map((input, index) => (
              <View key={index} style={styles.modalItem}>
                <Text style={styles.modalItemText}>
                  {numberTextMapping[input].text}
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={closeModal} style={styles.modalButtonBox}>
            <Text style={styles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    {/* Start and End Program Alert Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={startEndProgramModalVisible}
      onRequestClose={closeStartEndProgramModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Alert</Text>
          <Text style={styles.modalItemText}>
            Creating a Program requires Start and End!
          </Text>
          <TouchableOpacity onPress={closeStartEndProgramModal} style={styles.modalButtonBox}>
            <Text style={styles.modalCloseButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    {/* Specific Confirmation Modal */}
  <Modal
    animationType="slide"
    transparent={true}
    visible={confirmationModalVisible}
    onRequestClose={() => setConfirmationModalVisible(false)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Confirmation</Text>
        <Text style={styles.modalItemText}>
          Are you sure you want to remove this input?
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity onPress={handleConfirmRemove}>
            <Text style={styles.modalButton}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelRemove}>
            <Text style={[styles.modalButton, styles.cancelButton]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  <Modal
animationType="slide"
transparent={true}
visible={clearConfirmationModalVisible}
onRequestClose={() => setClearConfirmationModalVisible(false)}
>
<View style={styles.modalContainer}>
<View style={styles.modalContent}>
  <Text style={styles.modalTitle}>Confirmation</Text>
  <Text style={styles.modalItemText}>
    Are you sure you want to clear all RFID inputs?
  </Text>
  <View style={styles.modalButtons}>
    <TouchableOpacity onPress={handleConfirmClear}>
      <Text style={styles.modalButton}>Confirm</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setClearConfirmationModalVisible(false)}>
      <Text style={[styles.modalButton, styles.cancelButton]}>Cancel</Text>
    </TouchableOpacity>
  </View>
</View>
</View>
</Modal>

<Modal
animationType="slide"
transparent={true}
visible={errorModalVisible}
onRequestClose={() => setErrorModalVisible(false)}
>
<View style={styles.modalContainer}>
<View style={styles.modalContent}>
  <Text style={styles.modalTitle}>Error</Text>
  <Text style={styles.modalItemText}>{errorMessage}</Text>
  <TouchableOpacity onPress={() => setErrorModalVisible(false)} style={styles.modalButtonBox}>
    <Text style={styles.modalCloseButton}>Close</Text>
  </TouchableOpacity>
</View>
</View>
</Modal>

</View>
);
};

const styles = StyleSheet.create({
  newPageContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#9AD0C2',
    paddingTop: 30,
  },
  newPageText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'RobotoMono-Bold',
    marginBottom: 1,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    backgroundColor: '#265073',
    borderWidth: 1,
    textShadowColor: 'black',  // Outline color
    textShadowOffset: { width: 1, height: 1 },  // Outline offset
    textShadowRadius: 2,  // Outline radius,
  },
  whiteBox: {
    height: 500,
    width: 370,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 30,
    paddingTop: 30,
    paddingBottom: 100,
    borderWidth: 1,
  },
  // Add a new style for the container of all buttons
  buttonContainer: {
  flexDirection: 'column',
  alignItems: 'center',
  },

  // Modify the existing styles for the buttonRow and icon
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    margin: 1,
  },
  instructionImage: {
    margin: 5,
  },
  input: {
    height: 0,
    width: 0,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    maxHeight: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: 'RobotoMono-Bold',
    color: 'black',
  },
  modalItem: {
    marginBottom: 10,
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Bold',
  },
  modalButtonBox: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'blue',
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  modalCloseButton: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Bold',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'blue',
  },
  // Confirmation Modal styles
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    fontSize: 18,
    fontFamily: 'RobotoMono-Bold',
    color: '#fff',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
  },
  // Add this style in your StyleSheet.create block
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
  },
  closeIcon: {
    width: 43,
    height: 43,
    resizeMode: 'contain',
    margin: 1,
  },

});

export default TerminalPage;