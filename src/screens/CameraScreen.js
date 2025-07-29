import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/colors';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [savedDocuments, setSavedDocuments] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    loadSavedDocuments();
  }, []);

  const loadSavedDocuments = async () => {
    try {
      const documents = await AsyncStorage.getItem('savedDocuments');
      if (documents) {
        setSavedDocuments(JSON.parse(documents));
      }
    } catch (error) {
      console.error('Error loading saved documents:', error);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        setCapturedImage(photo.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const saveDocument = async () => {
    if (!capturedImage) return;

    Alert.prompt(
      'Save Document',
      'Enter a name for this document:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async (documentName) => {
            if (documentName && documentName.trim()) {
              try {
                const newDocument = {
                  id: Date.now().toString(),
                  name: documentName.trim(),
                  uri: capturedImage,
                  timestamp: new Date().toISOString(),
                };

                const updatedDocuments = [...savedDocuments, newDocument];
                await AsyncStorage.setItem('savedDocuments', JSON.stringify(updatedDocuments));
                setSavedDocuments(updatedDocuments);
                setCapturedImage(null);
                
                Alert.alert('Success', 'Document saved successfully!');
              } catch (error) {
                console.error('Error saving document:', error);
                Alert.alert('Error', 'Failed to save document. Please try again.');
              }
            }
          },
        },
      ],
      'plain-text',
      '',
      'default'
    );
  };

  const retakePicture = () => {
    setCapturedImage(null);
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color={COLORS.gray} />
          <Text style={styles.permissionText}>Camera access is required</Text>
          <Text style={styles.permissionSubText}>
            Please enable camera permissions in your device settings to capture documents.
          </Text>
        </View>
      </View>
    );
  }

  if (capturedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Document Preview</Text>
        </View>

        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        </View>

        <View style={styles.previewActions}>
          <TouchableOpacity style={styles.actionButton} onPress={retakePicture}>
            <Ionicons name="camera-outline" size={24} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Retake</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={saveDocument}>
            <Ionicons name="save-outline" size={24} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Document Camera</Text>
        <Text style={styles.subHeaderText}>Capture insurance documents, receipts, and forms</Text>
      </View>

      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.cameraOverlay}>
          <View style={styles.frameContainer}>
            <View style={styles.frame} />
            <Text style={styles.frameText}>Position document within frame</Text>
          </View>
        </View>
      </Camera>

      <View style={styles.cameraControls}>
        <TouchableOpacity style={styles.controlButton} onPress={flipCamera}>
          <Ionicons name="camera-reverse-outline" size={28} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => Alert.alert('Documents', `${savedDocuments.length} documents saved`)}
        >
          <Ionicons name="folder-outline" size={28} color={COLORS.white} />
          {savedDocuments.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{savedDocuments.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {savedDocuments.length > 0 && (
        <View style={styles.recentDocuments}>
          <Text style={styles.recentTitle}>Recent Documents</Text>
          <View style={styles.documentsList}>
            {savedDocuments.slice(-3).reverse().map((doc) => (
              <View key={doc.id} style={styles.documentItem}>
                <Ionicons name="document-outline" size={20} color={COLORS.primary} />
                <Text style={styles.documentName} numberOfLines={1}>
                  {doc.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.8,
    marginTop: 5,
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },
  permissionText: {
    fontSize: 18,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
  permissionSubText: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameContainer: {
    alignItems: 'center',
  },
  frame: {
    width: 280,
    height: 200,
    borderWidth: 2,
    borderColor: COLORS.white,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  frameText: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.black,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  previewImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  previewActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.black,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  recentDocuments: {
    backgroundColor: COLORS.background,
    padding: 15,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  documentsList: {
    flexDirection: 'column',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 5,
  },
  documentName: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginLeft: 10,
    flex: 1,
  },
});
