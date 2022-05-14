/*
 * Author  : Himanshu Raj
 * Date    : 25-07-2022
 * E-mail  : himanshuraj9194@gmail.com
 * Contiributed to Project : IoT Based Smart Parking System
 */
/*********************** Libraries ****************************************/
#include <ESP8266WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

/*********************** WiFi Credentials **********************************/
#define WLAN_SSID      "JioFiber-ief8V"    // WiFi SSID(service set identifier)
#define WLAN_PASSWORD  "Him1932524"        // WiFi Password

/*********************** Adafruit IO Credentials ***************************/
#define IO_SERVER       "io.adafruit.com"
#define IO_SERVERPORT    1883
#define IO_USERNAME  "Himanshu00"
#define IO_KEY       ""
WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, IO_SERVER, IO_SERVERPORT, IO_USERNAME, IO_KEY);
Adafruit_MQTT_Publish SPS_Data = Adafruit_MQTT_Publish(&mqtt, IO_USERNAME "/feeds/spp01");

/*********************** Connect WiFi***************************************/
void connectWiFi() {
  /******************** Establishing Connection to WiFi **************************/
  WiFi.begin(WLAN_SSID, WLAN_PASSWORD);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.print(WiFi.localIP());
  Serial.println("");
  digitalWrite(LED_BUILTIN, LOW);  // Turn On ON board LED (Active Low)
}

/*********************** Connect Adafruit Io Cloud *************************/
void connectAdafruitIo() {

  Serial.println("Connecting to Adafruit IO ...... ");
  int8_t ret;
  while ((ret = mqtt.connect()) != 0)
  {
    switch (ret)
    {
      case 1: Serial.println(F("Wrong protocol")); break;
      case 2: Serial.println(F("ID rejected")); break;
      case 3: Serial.println(F("Server unavail")); break;
      case 4: Serial.println(F("Bad user/pass")); break;
      case 5: Serial.println(F("Not authed")); break;
      case 6: Serial.println(F("Failed to subscribe")); break;
      default: Serial.println(F("Connection failed")); break;
    }

    if (ret >= 0)
      mqtt.disconnect();

    Serial.println(F("Retrying connection..."));
    delay(10000);
  }
  Serial.println(F("Adafruit IO Connected !"));
}

/*********************** Ping  Adafruit Io Cloud **************************/
void pingAdafruitIo() {
  Serial.println("pinging Adafruit Io cloud ... ");
  if (! mqtt.ping(3)) {
    if (! mqtt.connected())
      Serial.println("Reconnecting Adafruit Io cloud .... ");
    connectAdafruitIo();
  }
}

/***********************Publish Data to Adafruit Io Cloud Feed  ***********/
void publishDataToAdafruitIo(int value) {
  if (! SPS_Data.publish(value)) {
    Serial.println("Failed  !!!!!!!!!!!");
  }
  else {
    Serial.println("Published  !!!!!!!!");
  }
}

const int trigPin = 12;
const int echoPin = 14;
#define SOUND_VELOCITY 0.034
#define CM_TO_INCH 0.393701
long duration;
float distanceCm;
float distanceInch;
int readSensorData(){
  digitalWrite(trigPin, LOW);                // Clears the trigPin
  delayMicroseconds(2);                      // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);                // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);         
  distanceCm = duration * SOUND_VELOCITY/2;  // Calculate the distance
  Serial.print("Distance (cm): ");
  Serial.println(distanceCm);
  return distanceCm;
}
void setup() {
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  connectWiFi();
  connectAdafruitIo();
}

void loop(){
  pingAdafruitIo();
  int value = readSensorData(); 
  publishDataToAdafruitIo(value);
  delay(5000);
}
