import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    LayoutAnimation,
    ActivityIndicator,
    Platform,
    Animated,
    Dimensions,
  } from 'react-native';
  import React from 'react';
  import {COLORS, FONTS, ICONS, IMAGES} from '../../../Themes/Themes';
  import normalize from '../../../utils/helpers/normalize';
  import {useState} from 'react';
  import {Image} from 'react-native';
  import {useEffect} from 'react';
  import {useDispatch, useSelector} from 'react-redux';
  import constants from '../../../utils/constants';
  import JobsToday from './options/JobsToday';
  import NewJobs from './options/NewJobs';
  import Accepted from './options/Accepted';
  import _ from 'lodash';
  import isInternetConnected from '../../../utils/helpers/NetInfo';
  import {
    getAcceptedJobRequest,
    getJobDetailsRequest,
    getNewJobRequest,
    getTodayJobRequest,
    jobCompleteRequest,
  } from '../../../redux/reducer/ClinerJobReducer';
  import showErrorAlert from '../../../utils/helpers/Toast';
  import moment from 'moment';
  import WheelPicker from 'react-native-wheely';
  import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
  import {useIsFocused} from '@react-navigation/native';
  import {getCurrentLocation, getWatchLocation} from '../../../utils/halper';
  import {useRef} from 'react';
  import {captureRef} from 'react-native-view-shot';
  import Geolocation from 'react-native-geolocation-service';
  import {
    getProfileDetailsRequest,
    setUserCurrentMap,
  } from '../../../redux/reducer/AuthReducer';
  import ActionSheet from '../../../components/ActionSheet';
  import MapViewDirections from 'react-native-maps-directions';
  const {width, height} = Dimensions.get('window');
  
  const MAP_PLATFROM_TYPE = Platform.OS === 'android' ? 'terrain' : 'standard';
  
  const SIZES = {
    radius: 30,
    padding: 10,
    width,
    height,
  };
  
  const CleanerHome = ({navigation}) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const AuthReducer = useSelector(state => state.AuthReducer);
    const ClinerJobReducer = useSelector(state => state.ClinerJobReducer);
    let userInfo = AuthReducer?.userDetails;
    const [isShowAlert, setIsShowAlert] = useState({
      isShowNewJobs: true,
      isShowAccepted: true,
    });
  
    // MAP Variables
    const mapMainRef = useRef();
    const [fromLocation, setFromLocation] = useState(null);
    const [toLocation, setToLocation] = useState(null);
    const [region, setRegion] = useState(null);
    const [duration, setDuration] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [watchID, setwatchID] = useState('');
    const [angle, setAngle] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const isLastUpdate = useRef(0);
    const [isPreviousDirection, setIsPreviousDirection] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
    const [isGetCurrentLocation, setIsGetCurrentLocation] = useState(false);
  
    /* --------------------------------------------------------------------------------------------- */
  
    const OPTIONS = ['Jobs_Today', 'New_Jobs', 'Accepted'];
    const [selectdOption, setSelectedOptions] = useState('Jobs_Today');
    const [expandedHeight, setExpandedHeight] = useState(null);
  
    const [expanded, setExpanded] = useState(false);
    const [online, setOnline] = useState(false);
    const [nmbr, setNmbr] = useState(false);
    const [conirmationModal, setConirmationModal] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [isSNJD, setSNJD] = useState({});
  
    const [jobRef, setJobRef] = useState({
      jobDetails: {},
      isConfirm: false,
      isVisible: false,
      isSuccessfull: false,
      hours: '',
      isVisibleH: false,
      minutes: '',
      isVisibleM: false,
    });
  
    function update(isEmpty = false, field, value) {
      if (isEmpty) {
        setJobRef({
          jobDetails: {},
          isConfirm: false,
          isVisible: false,
          isSuccessfull: false,
          hours: '',
          isVisibleH: false,
          minutes: '',
          isVisibleM: false,
        });
      } else {
        setJobRef(pre => ({
          ...pre,
          [field]: value,
        }));
      }
    }
  
    useEffect(() => {
      if (isFocused) {
        getJobListing();
        getCurrentLocation(res => {
          if (res !== false) {
            setCurrentLocation({
              latitude: res?.latitude,
              longitude: res?.longitude,
              latitudeDelta: 0.015, // 0.03
              longitudeDelta: 0.0121, // 0.03
            });
  
            setTimeout(() => {
              animateMap(res?.latitude, res?.longitude);
            }, 2000);
          }
        });
  
        getUserProfile();
      }
    }, [isFocused]);
  
    function getUserProfile() {
      isInternetConnected()
        .then(() => {
          dispatch(getProfileDetailsRequest());
        })
        .catch(err => {
          showErrorAlert('Please Connect To Internet');
        });
    }
  
    function getJobListing() {
      isInternetConnected()
        .then(() => {
          dispatch(
            getTodayJobRequest({
              schedule_date: moment(new Date()).format('YYYY-MM-DD'),
              page: 1,
              perPage: 10,
              isAccepted: true,
            }),
          );
          dispatch(
            getNewJobRequest({
              page: 1,
              perPage: 10,
            }),
          );
          dispatch(
            getAcceptedJobRequest({
              isAccepted: true,
              page: 1,
              perPage: 10,
            }),
          );
        })
        .catch(err => {
          showErrorAlert('Please Connect To Internet');
        });
    }
  
    const toggleExpand = () => {
      if (expanded) {
        setIsShowAlert({
          isShowAccepted: true,
          isShowNewJobs: true,
        });
  
        setSNJD({});
      } else {
        setIsShowAlert({
          isShowAccepted: false,
          isShowNewJobs: false,
        });
      }
      setExpanded(!expanded);
      setExpandedHeight(!expanded);
    };
  
    function CleanerHomeHeader() {
      return (
        <View style={styles.headerContainer}>
          <View
            style={{
              backgroundColor: online
                ? COLORS.COLOR_BLACK
                : COLORS.COLOR_GREY_ONE,
              height: normalize(32),
              width: normalize(80),
              borderRadius: normalize(20),
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <Text style={styles.headerTitle}>
              {online ? 'Online' : 'Offline'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Account')}
            style={styles.profileViewer}>
            <Image
              source={
                userInfo?.profile_photo
                  ? {uri: constants.CLEANER_IBU + userInfo?.profile_photo}
                  : ICONS.user
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      );
    }
  
    function AlertJobs(type, data) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={type !== 'New_Jobs'}
          onPress={() => {
            setSNJD(data);
            getDetails(data?._id);
            toggleExpand();
          }}
          style={styles.alertContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsShowAlert(pre => ({
                ...pre,
                [type == 'Accepted' ? 'isShowAccepted' : 'isShowNewJobs']: false,
              }));
            }}
            style={styles.cancelTouch}>
            <Image source={ICONS.CROSS_ICON} style={styles.crossIcon} />
          </TouchableOpacity>
  
          <View style={styles.titleViewer}>
            <Text style={styles.alertTitle}>
              {data?.client_data?.user_type == 'rental'
                ? 'Airbnb/Rental'
                : 'Residential'}
            </Text>
          </View>
  
          <View
            style={{
              width: '85%',
              alignSelf: 'center',
              marginVertical: normalize(10),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.boxText}>
                Zip code: {data?.client_data?.zip?.code}
              </Text>
              <Text style={styles.boxText}>Bath(s): {data?.num_bath}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.boxText}>Size: {data?.property_size} sqft</Text>
              <Text style={styles.boxText}>Bed(s): {data?.num_bed}</Text>
            </View>
            <Text style={styles.boxText}>
              Jobs per month:{' '}
              {data?.job_per_month !== '' ? data?.job_per_month : 1}
            </Text>
            {type !== 'Accepted' && data?.type_of_cleaning && (
              <Text
                style={[
                  styles.boxText,
                  {
                    textTransform: 'capitalize',
                  },
                ]}>
                Cleaning Type: {data.type_of_cleaning}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      );
    }
  
    useEffect(() => {
      if (jobRef.hours !== '' && jobRef.minutes !== '' && !jobRef.isSuccessfull) {
        isComplete({
          job_id: jobRef.jobDetails?._id,
          number_hour: '' + jobRef.hours + '' + jobRef.minutes,
          // number_min: jobRef.minutes,
        });
      }
    }, [jobRef.hours, jobRef.minutes]);
  
    function isComplete(obj) {
      isInternetConnected()
        .then(() => {
          dispatch(jobCompleteRequest(obj));
        })
        .catch(err => {
          showErrorAlert('Please Connect To Internet');
        });
    }
  
    useEffect(() => {
      if ('ClienrJob/jobCompleteSuccess' == ClinerJobReducer.status) {
        update(false, 'isVisible', true);
        update(false, 'isSuccessfull', true);
        dispatch(
          getTodayJobRequest({
            schedule_date: moment(new Date()).format('YYYY-MM-DD'),
            page: 1,
            perPage: 10,
            isAccepted: true,
          }),
        );
      }
    }, [ClinerJobReducer.status]);
  
    // ------------- view shot -----------------
  
    const captureMapView = async () => {
      if (mapMainRef.current) {
        try {
          const uri = await captureRef(mapMainRef.current, {
            format: 'base64', // Use 'base64' format
            quality: 0.8, // Image quality (0.0 - 1.0)
          });
          // console.log('Captured Base64 URI:', uri);
          dispatch(setUserCurrentMap({uri: uri}));
          // Now you can do something with the captured image base64 data
        } catch (error) {
          console.error('Capture error:', error);
        }
      }
    };
  
    function getDetails(id) {
      if (ClinerJobReducer.status !== 'ClienrJob/getJobDetailsRequest') {
        isInternetConnected()
          .then(() => {
            dispatch(
              getJobDetailsRequest({
                job_id: id,
              }),
            );
          })
          .catch(err => {
            console.log('INTERNET CONNECT : ', 'false');
            showErrorAlert('Please Connect To Internet');
          });
      }
    }
  
    function animateMap(latitude, longitude) {
      mapMainRef.current.animateCamera({
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 18,
      });
    }
  
    // --------------------------------------------------------------------------
  
    const stopWatchingLocation = watchId => {
      // console.log('stopWatchingLocation --- >');
      Geolocation.clearWatch(watchId);
      setOnline(false);
      setFromLocation(null);
      setToLocation(null);
      setIsGetCurrentLocation(true);
      getCurrentLocation(res => {
        if (res !== false) {
          animateMap(res?.latitude, res?.longitude);
          setCurrentLocation({
            latitude: res?.latitude,
            longitude: res?.longitude,
            latitudeDelta: 0.015, // 0.03
            longitudeDelta: 0.0121, // 0.03
          });
          setIsGetCurrentLocation(false);
        } else {
          setIsGetCurrentLocation(false);
          animateMap(currentLocation.latitude, currentLocation.longitude);
        }
      });
    };
  
    useEffect(() => {
      if (isTracking) {
        // console.log('isTracking ------>> watchPosition ');
        let watchID = Geolocation.watchPosition(
          //watchPosition
          position => {
            // console.log('position --- ', position);
  
            let fromLoc = {
              latitude: position.coords?.latitude,
              longitude: position.coords?.longitude,
              latitudeDelta: 0.015, // 0.03
              longitudeDelta: 0.0121, // 0.03
            };
            setCurrentLocation(fromLoc);
  
            let toLoc = {
              latitude: Platform.OS == 'android' ? 22.579271656441943 : 37.618897,
              longitude:
                Platform.OS == 'android' ? 88.42630214032692 : -122.375542,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            };
            // let street = currentLocation.streetName;
  
            let mapRegion = {
              latitude: (fromLoc.latitude + toLoc.latitude) / 2,
              longitude: (fromLoc.longitude + toLoc.longitude) / 2,
              latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
              longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
            };
  
            // setStreetName(street);
            setFromLocation(fromLoc);
            setToLocation(toLoc);
            setRegion(mapRegion);
  
            // console.log('isLastUpdate.current -- ', isLastUpdate.current);
  
            if (isLastUpdate.current == 10) {
              isLastUpdate.current = 0;
            }
  
            if (isLastUpdate.current == 0) {
              isLastUpdate.current = isLastUpdate.current + 1;
              setIsPreviousDirection({
                from: fromLoc,
                to: toLoc,
              });
            } else {
              isLastUpdate.current = isLastUpdate.current + 1;
            }
          },
          error => console.log(error),
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
            distanceFilter: 1,
            // maximumAge: 0,
            // timeout: 10000,
          },
        );
  
        setwatchID(watchID);
      }
    }, [isTracking]);
  
    function calculateAngle(coordinates) {
      let startLat = coordinates[0]['latitude'];
      let startLng = coordinates[0]['longitude'];
      let endLat = coordinates[1]['latitude'];
      let endLng = coordinates[1]['longitude'];
      let dx = endLat - startLat;
      let dy = endLng - startLng;
  
      return (Math.atan2(dy, dx) * 180) / Math.PI;
    }
  
    function renderMap() {
      const destinationMarker = () => (
        <Marker coordinate={toLocation}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.COLOR_ORANGE,
              }}>
              <Image
                source={ICONS.pin}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                }}
              />
            </View>
          </View>
        </Marker>
      );
  
      const carIcon = () => (
        <Marker
          coordinate={fromLocation}
          anchor={{x: 0.5, y: 0.5}}
          flat={true}
          rotation={angle}>
          <Image
            source={IMAGES.CarMarker}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </Marker>
      );
  
      return (
        <MapView
          ref={mapMainRef}
          provider={PROVIDER_GOOGLE}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            height: '100%',
          }}
          onMapLoaded={() => {
            // captureMapView();
          }}
          // onLayout={() => {
          //   animateMap(currentLocation.latitude, currentLocation.longitude);
          // }}
          // region={currentLocation}//trackingRegion
          region={isTracking && region !== null ? region : currentLocation}
          // initialRegion={
          //   isTracking && region !== null ? region : currentLocation
          // }
          zoomEnabled={true}
          mapType={MAP_PLATFROM_TYPE}
          // mapType="satellite"
          toolbarEnabled={true}
          showsCompass={true}
          showsScale={true}
          loadingEnabled={true}
          showsBuildings={true}
          showsMyLocationButton={false}
          showsTraffic={false}
          moveOnMarkerPress={false}
          userLocationPriority={'high'}
          followsUserLocation={false}
          showsPointsOfInterest={false}
          rotateEnabled={true}
          showsUserLocation={false} // show current location
          paddingAdjustmentBehavior={'always'}
          // onPress={event => {
          //   animateMap(
          //     event.nativeEvent.coordinate.latitude,
          //     event.nativeEvent.coordinate.longitude,
          //   );
          // }}
          precision="high">
          {isTracking && fromLocation !== null && toLocation !== null ? (
            <>
              {isPreviousDirection?.from &&
                isPreviousDirection?.to &&
                Platform.OS == 'ios' && (
                  <MapViewDirections
                    origin={isPreviousDirection?.from}
                    destination={isPreviousDirection?.to}
                    apikey={'AIzaSyBioeFQADEU3Ov0JXshJDdJ_pJsaoWid7s'}
                    strokeWidth={5}
                    strokeColor={COLORS.COLOR_ORANGE}
                    optimizeWaypoints={true}
                  />
                )}
              <MapViewDirections
                origin={fromLocation}
                destination={toLocation}
                apikey={'AIzaSyBioeFQADEU3Ov0JXshJDdJ_pJsaoWid7s'}
                strokeWidth={5}
                strokeColor={COLORS.COLOR_ORANGE}
                optimizeWaypoints={true}
                onReady={result => {
                  setDuration(result.duration);
                  if (!isReady) {
                    // Fit route into maps
                    mapMainRef.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        right: SIZES.width / 20,
                        bottom: SIZES.height / 4,
                        left: SIZES.width / 20,
                        top: SIZES.height / 8,
                      },
                    });
  
                    // Reposition the car
                    let nextLoc = {
                      latitude: result.coordinates[0]['latitude'],
                      longitude: result.coordinates[0]['longitude'],
                    };
  
                    setFromLocation(nextLoc);
                    setIsReady(true);
                  }
  
                  if (result.coordinates.length >= 2) {
                    let angle = calculateAngle(result.coordinates);
                    setAngle(angle);
                  }
                }}
              />
            </>
          ) : null}
          {isTracking && toLocation !== null && destinationMarker()}
          {fromLocation !== null && isTracking ? carIcon() : null}
  
          {/* Current Location */}
          {!isTracking && (
            <Marker coordinate={currentLocation}>
              <Image
                source={ICONS.pin}
                resizeMode="contain"
                style={{
                  height: normalize(22),
                  width: normalize(22),
                }}
              />
            </Marker>
          )}
        </MapView>
      );
    }
  
    // --------------------------------------------------------------------------
  
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          flex: 1,
        }}>
        {renderMap()}
        {CleanerHomeHeader()}
        {/* <View
          style={{
            position: 'absolute',
            top: normalize(35),
            width: '80%',
            padding: 16,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: normalize(20),
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: normalize(12),
              fontWeight: '600',
            }}>
            Destination {duration.toFixed(2)} minutes
          </Text>
        </View> */}
        {/*--------------- HANDLED ONLINE OFFLINE -------------*/}
  
        {/* {isShowInternetStatus && select == 0 ? (
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: COLORS.white,
              borderRadius: normalize(14),
              shadowColor: 'rgba(0,0,0,0.5)',
              shadowOffset: {
                width: 0,
                height: 7,
              },
              shadowOpacity: 0.41,
              shadowRadius: 9.11,
  
              elevation: 10,
              marginTop: normalize(20),
              paddingHorizontal: normalize(12),
              paddingVertical: normalize(18),
            }}>
            {!online && (
              <TouchableOpacity
                onPress={() => setIsShowInternetStatus(!isShowInternetStatus)}
                style={{
                  backgroundColor: COLORS.white,
                  height: normalize(8),
                  width: normalize(8),
                  borderRadius: normalize(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  top: normalize(6),
                  right: normalize(10),
                }}>
                <Image
                  source={ICONS.CROSS_ICON}
                  style={{
                    height: normalize(6),
                    width: normalize(6),
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            )}
  
            <Text
              style={{
                alignSelf: 'center',
                fontSize: normalize(11.5),
                color: COLORS.COLOR_BLACK,
                fontFamily: FONTS.medium,
              }}>
              {!online
                ? 'There is no payment information on file!'
                : 'Destination: 123 Circleround Ct.\nFountain Valley CA 92708'}
            </Text>
          </View>
        ) : null} */}
  
        {/*--------------- ALERT -------------*/}
  
        {selectdOption == 'New_Jobs' &&
          !_.isEmpty(ClinerJobReducer?.newJobList) &&
          isShowAlert?.isShowNewJobs && (
            <>{AlertJobs(selectdOption, ClinerJobReducer?.newJobList[0])}</>
          )}
        {selectdOption == 'Accepted' &&
          !_.isEmpty(ClinerJobReducer?.acceptedJobList) &&
          isShowAlert?.isShowAccepted && (
            <>{AlertJobs(selectdOption, ClinerJobReducer?.acceptedJobList[0])}</>
          )}
  
        {/* ----------- JOBS TODAY COMPLETE FUNC ----------- */}
        {/* Confirmation */}
        {!jobRef?.isConfirm && jobRef.isVisible && (
          <View style={styles.vContainer}>
            <Text style={styles.vTitle}>
              Are you sure the cleaning has been completetd?
            </Text>
            <View style={styles.vRow}>
              {['Yes', 'No'].map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (index == 0) {
                        if (jobRef.jobDetails?.offers_data?.perhour) {
                          update(false, 'isConfirm', index == 0);
                          update(false, 'isVisible', index == 0 ? true : false);
                        } else {
                          update(false, 'isVisible', false);
                          update(false, 'isConfirm', index == 0);
                          isComplete({
                            job_id: jobRef.jobDetails?._id,
                          });
                        }
                      } else {
                        update(false, 'isVisible', false);
                      }
                    }}
                    style={[
                      styles.vTouch,
                      {
                        backgroundColor:
                          index == 0 ? COLORS.COLOR_GREEN : COLORS.COLOR_BLACK,
                      },
                    ]}>
                    <Text style={styles.vText}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
  
        {/* Number of hours */}
        {jobRef?.isConfirm && jobRef.isVisible && !jobRef.isSuccessfull ? (
          <>
            <View style={styles.vContainer}>
              <Text style={styles.vTitle}>
                {'ClienrJob/jobCompleteRequest' == ClinerJobReducer.status
                  ? 'Please Wait...'
                  : 'Number of hours ?'}
              </Text>
              {'ClienrJob/jobCompleteRequest' == ClinerJobReducer.status ? (
                <View
                  style={{
                    margin: normalize(8),
                    padding: normalize(16.5),
                  }}>
                  <ActivityIndicator size={'small'} color={COLORS.COLOR_ORANGE} />
                </View>
              ) : (
                <View style={styles.vHRow}>
                  {['H', 'M'].map((item, index) => {
                    let arr = ['00', '15', '30', '45'];
                    return (
                      <View
                        style={{
                          width: normalize(50),
                          margin: normalize(8),
                        }}>
                        {(index == 0 && !jobRef.isVisibleH) ||
                        (index == 1 && !jobRef.isVisibleM) ? (
                          <TouchableOpacity
                            onPress={() => {
                              if (index == 0) {
                                update(false, 'isVisibleH', true);
                                update(false, 'isVisibleM', false);
                              } else {
                                update(false, 'isVisibleM', true);
                                update(false, 'isVisibleH', false);
                              }
                            }}
                            style={styles.touch}>
                            <Text style={styles.selectionTitle}>
                              {index == 0 ? jobRef.hours : jobRef.minutes}
                            </Text>
                            <Image
                              source={ICONS.DROPDOWN_ICON}
                              style={styles.dropImg}
                            />
                          </TouchableOpacity>
                        ) : null}
  
                        {(index == 0 && jobRef.isVisibleH) ||
                        (index == 1 && jobRef.isVisibleM) ? (
                          <View style={styles.vDrop}>
                            <WheelPicker
                              scrollEnabled
                              nestedScrollEnabled
                              selectedIndex={
                                jobRef.isVisibleH
                                  ? jobRef.hours !== ''
                                    ? jobRef.hours // - 1
                                    : 0
                                  : jobRef.minutes !== ''
                                  ? jobRef.minutes //arr.findIndex(x => x === jobRef.minutes)
                                  : 0
                              }
                              options={
                                [...Array(10).keys()].map(i => i)
                                // index == 0
                                //   ? [...Array(10).keys()].map(i => i)
                                //   : arr
                              }
                              onChange={index => {
                                if (jobRef.isVisibleH) {
                                  update(false, 'isVisibleH', !jobRef.isVisibleH);
                                  update(false, 'hours', index); // + 1
                                } else {
                                  update(false, 'isVisibleM', !jobRef.isVisibleM);
                                  update(false, 'minutes', index); //arr[index]
                                }
                              }}
                              visibleRest={1}
                              selectedIndicatorStyle={styles.selectedIndicator}
                              containerStyle={{
                                alignSelf: 'center',
                                height: normalize(100),
                              }}
                              itemTextStyle={styles.itemText}
                            />
                          </View>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </>
        ) : null}
  
        {/* Successfull */}
        {jobRef.isSuccessfull && jobRef.isVisible && (
          <View style={styles.vContainer}>
            <TouchableOpacity
              style={styles.touch2}
              onPress={() => {
                update(true);
              }}>
              <Image source={ICONS.BACK_ICON} style={styles.backImg} />
            </TouchableOpacity>
            <Text style={styles.txt}>{'Thank you\nfor completing the job!'}</Text>
  
            <Text style={styles.txt2}>
              The client has been notified to release the payment.
            </Text>
          </View>
        )}
  
        {/* -------- Animated Bottom Sheet -------- */}
        <ActionSheet
          setCurrentIndex={expandedHeight !== null ? (expandedHeight ? 1 : 2) : 0}
          bottomSheetHeaderComponent={
            <>
              {!nmbr && !conirmationModal && !completed && (
                <TouchableOpacity
                  onPress={() => {
                    setOnline(true);
                    setIsTracking(!isTracking);
  
                    if (isTracking && watchID !== '') {
                      stopWatchingLocation(watchID);
                    }
                  }}
                  style={styles.goBtn}>
                  <Image
                    source={online ? ICONS.ONLINE_ICON : ICONS.GO_ICON}
                    style={styles.goImage}
                  />
                </TouchableOpacity>
              )}
  
              {!isTracking && (
                <TouchableOpacity
                  disabled={isGetCurrentLocation}
                  onPress={() => {
                    setIsGetCurrentLocation(true);
                    getCurrentLocation(res => {
                      if (res !== false) {
                        animateMap(res?.latitude, res?.longitude);
                        setCurrentLocation({
                          latitude: res?.latitude,
                          longitude: res?.longitude,
                          latitudeDelta: 0.015, // 0.03
                          longitudeDelta: 0.0121, // 0.03
                        });
                        setIsGetCurrentLocation(false);
                      } else {
                        setIsGetCurrentLocation(false);
                        animateMap(
                          currentLocation.latitude,
                          currentLocation.longitude,
                        );
                      }
                    });
                  }}
                  style={styles.currentPostion}>
                  <Image source={ICONS.current_location} style={styles.goImage} />
                </TouchableOpacity>
              )}
            </>
          }
          children={
            <>
              <View style={styles.optionsViewer}>
                <View style={styles.items}>
                  {OPTIONS.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          if (selectdOption !== item || expanded == true) {
                            setSelectedOptions(item);
  
                            if (expanded) {
                              toggleExpand();
                            }
  
                            if (isShowAlert.isShowNewJobs && index == 1) {
                              update(true);
                            } else if (isShowAlert.isShowAccepted && index == 2) {
                              update(true);
                            }
                          }
                        }}
                        style={[
                          styles.optionsV,
                          {
                            backgroundColor:
                              selectdOption == item
                                ? COLORS.Border_Color2
                                : COLORS.white,
                          },
                        ]}>
                        {item == 'New_Jobs' &&
                          !_.isEmpty(ClinerJobReducer?.newJobList) && (
                            <TouchableOpacity style={styles.alertV}>
                              <Text style={styles.alertTxt}>!</Text>
                            </TouchableOpacity>
                          )}
                        <Text style={styles.optionsTitle}>
                          {item.replace('_', ' ')}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
  
              {selectdOption == 'Jobs_Today' && (
                <JobsToday
                  onScroll={e => setExpandedHeight(e)}
                  onPress={res => {
                    update(true);
                    update(false, 'jobDetails', res);
                    update(false, 'isVisible', true);
                  }}
                />
              )}
              {selectdOption == 'New_Jobs' && (
                <NewJobs
                  selectedJobDetails={isSNJD}
                  expanded={expanded}
                  onScroll={e => setExpandedHeight(e)}
                  onPress={() => {
                    toggleExpand();
                  }}
                />
              )}
              {selectdOption == 'Accepted' && (
                <Accepted onScroll={e => setExpandedHeight(e)} />
              )}
            </>
          }
        />
      </View>
    );
  };
  
  export default CleanerHome;
  
  const styles = StyleSheet.create({
    headerContainer: {
      height: normalize(55),
      width: '100%',
      marginTop: Platform.OS == 'ios' ? normalize(45) : normalize(25),
      flexDirection: 'row',
      justifyContent: 'center',
    },
    profileViewer: {
      height: normalize(40),
      width: normalize(40),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: normalize(10),
    },
    profileImage: {
      resizeMode: 'contain',
      height: normalize(35),
      width: normalize(35),
      borderColor: COLORS.white,
      borderWidth: normalize(2.5),
      borderRadius: normalize(50),
    },
    headerTitle: {
      fontSize: normalize(12),
      color: COLORS.COLOR_WHITE,
      fontFamily: FONTS.medium,
      fontWeight: '500',
      lineHeight: 24,
    },
    optionsViewer: {
      height: normalize(70),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: COLORS.Line_color,
      borderBottomWidth: normalize(1),
    },
    items: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexGrow: 1,
    },
    optionsTitle: {
      alignSelf: 'center',
      fontSize: normalize(11),
      color: COLORS.COLOR_BLACK,
      fontFamily: FONTS.medium,
    },
    optionsV: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 50,
      borderWidth: 1,
      height: normalize(35),
      width: normalize(90),
      marginHorizontal: normalize(5),
      borderColor: COLORS.Border_Color2,
      justifyContent: 'center',
    },
    alertV: {
      backgroundColor: COLORS.COLOR_ORANGE,
      height: normalize(10),
      width: normalize(10),
      borderRadius: normalize(8),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      alignSelf: 'flex-end',
      top: normalize(4),
      right: normalize(9),
    },
    alertTxt: {
      fontSize: normalize(8),
      color: COLORS.COLOR_WHITE,
      fontFamily: FONTS.medium,
      fontWeight: '800',
    },
    goBtn: {
      position: 'absolute',
      top: normalize(-50),
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    currentPostion: {
      position: 'absolute',
      top: normalize(-50),
      justifyContent: 'center',
      alignItems: 'center',
      right: normalize(10),
    },
    goImage: {
      height: normalize(65),
      width: normalize(65),
      alignItems: 'center',
      resizeMode: 'contain',
    },
    alertContainer: {
      alignSelf: 'center',
      backgroundColor: COLORS.white,
      borderRadius: normalize(14),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 10,
      marginTop: normalize(20),
      width: normalize(230),
    },
    cancelTouch: {
      backgroundColor: 'transparent',
      height: normalize(30),
      width: normalize(30),
      borderRadius: normalize(14),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: normalize(-3),
      top: normalize(-3),
      zIndex: 1,
    },
    crossIcon: {
      height: normalize(6),
      width: normalize(6),
      resizeMode: 'contain',
    },
    titleViewer: {
      borderBottomWidth: normalize(0.5),
      borderBottomColor: COLORS.COLOR_GREY_ONE + 80,
      paddingVertical: normalize(10),
    },
    alertTitle: {
      alignSelf: 'center',
      fontSize: normalize(13),
      color: COLORS.COLOR_BLACK,
      fontFamily: FONTS.medium,
    },
    boxText: {
      fontFamily: FONTS.medium,
      color: COLORS.COLOR_BLACK,
      fontSize: normalize(11.5),
      marginVertical: normalize(2),
    },
    vContainer: {
      alignSelf: 'center',
      backgroundColor: COLORS.white,
      borderRadius: normalize(14),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 10,
      marginTop: normalize(20),
      marginHorizontal: normalize(20),
      paddingVertical: normalize(20),
      width: '75%',
    },
    vTitle: {
      alignSelf: 'center',
      fontSize: normalize(12),
      color: COLORS.COLOR_BLACK,
      fontFamily: FONTS.medium,
      textAlign: 'center',
      width: normalize(180),
    },
    vRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: normalize(13),
      paddingHorizontal: normalize(10),
    },
    vTouch: {
      height: normalize(24),
      borderRadius: normalize(30),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: normalize(4),
      paddingHorizontal: normalize(8),
      width: normalize(60),
      height: normalize(26),
    },
    vText: {
      fontSize: normalize(12),
      fontFamily: FONTS.medium,
      color: COLORS.COLOR_WHITE,
    },
    vHRow: {
      flexDirection: 'row',
      marginTop: normalize(5),
      justifyContent: 'center',
    },
    touch: {
      height: normalize(45),
      width: normalize(50),
      borderRadius: normalize(10),
      backgroundColor: COLORS.OtpInput,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: normalize(8),
    },
    selectionTitle: {
      fontFamily: FONTS.medium,
      color: COLORS.COLOR_BLACK,
      fontSize: normalize(11.5),
      textAlign: 'right',
      width: normalize(18),
    },
    dropImg: {
      height: normalize(10),
      width: normalize(10),
      resizeMode: 'contain',
    },
    vDrop: {
      position: 'absolute',
      width: normalize(50),
      borderRadius: normalize(10),
      backgroundColor: COLORS.OtpInput,
      height: normalize(100),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
    },
    selectedIndicator: {
      alignSelf: 'center',
      borderTopWidth: normalize(1.5),
      borderBottomWidth: normalize(1.5),
      borderColor: COLORS.Gray_Color,
    },
    itemText: {
      fontSize: normalize(11),
      color: COLORS.black,
      alignSelf: 'center',
      fontFamily: FONTS.medium,
    },
    touch2: {
      position: 'absolute',
      top: normalize(8),
      left: normalize(8),
      height: normalize(28),
      width: normalize(28),
      backgroundColor: COLORS.COLORS_GREY,
      borderRadius: normalize(50),
      justifyContent: 'center',
      alignItems: 'center',
    },
    backImg: {
      height: normalize(15),
      width: normalize(15),
      resizeMode: 'contain',
      tintColor: COLORS.black,
      transform: [{rotate: '180deg'}],
    },
    txt: {
      alignSelf: 'center',
      fontSize: normalize(14),
      color: COLORS.black,
      fontFamily: FONTS.semibold,
      textAlign: 'center',
      marginTop: normalize(5),
    },
    txt2: {
      alignSelf: 'center',
      fontSize: normalize(11.5),
      color: COLORS.COLOR_BLACK,
      fontFamily: FONTS.medium,
      textAlign: 'center',
      marginVertical: normalize(20),
      paddingHorizontal: normalize(30),
    },
  });
  