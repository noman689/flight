import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

interface FlightDetailsProps {
  details:any
}

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 50,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#4f4f4f',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#4f4f4f',
    marginBottom: 10,
  },
  label: {
    fontWeight: 900,
    fontSize: 16,
    color: '#701644',
    marginBottom: 5,
  },
  lightLabel: {
    fontWeight: 900,
    fontSize: 16,
    color: '#4f4f4f',
    marginBottom: 5,
  },
  value: {
    color: '#4f4f4f',
    marginBottom: 15,
  },
  subvalue: {
    color: '#4f4f4f',
  },
  simpleText: {
    color: '#4f4f4f',
    marginBottom: 10,
  },
  lineBreak: {
    width: '70%',
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'gray',
    alignSelf: 'center',
  },
  lineBreak2: {
    width: '100%',
    borderBottom: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'gray',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 5,
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    left: 50,
    right: 50,
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: '#4f4f4f',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 9,
    color: '#4f4f4f',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
});

const FlightDetailsPdf: React.FC<FlightDetailsProps> = ({
  details
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image
            source={
              'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/kqizaebyrlnldyjjkimn'
            }
            style={{ height: 30, width: 30 }}
          />
          <Text style={styles.title}>Duffle Airways Ticket</Text>
        </View>
        <View>
          <View>
            <Text style={styles.label}>Booking Date</Text>
            <Text style={styles.value}>Tuesday, April 18, 2023</Text>
          </View>
          <View>
            <Text style={styles.label}>Passenger Name</Text>
            <Text style={styles.value}>Mr Hello Jee</Text>
          </View>
        </View>
        <View>
          <Text style={styles.subheading}>Flight Details</Text>
          <Text style={styles.lightLabel}>Route</Text>
          <View style={styles.lineBreak2} />
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>From</Text>
              <Text style={styles.value}>{from}</Text>
            </View>
            <View>
              <Text style={styles.label}>Airline</Text>
              <Text style={styles.value}>{airline}</Text>
            </View>
            <View>
              <View>
                <Text style={styles.label}>Departure Time</Text>
              </View>
              <View>
                <Text style={styles.subvalue}>{departureDate}</Text>
                <Text style={styles.subvalue}>{departureTime}</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.label}>Arrival Time</Text>
              </View>
              <View>
                <Text style={styles.subvalue}>{arrivalDate}</Text>
                <Text style={styles.subvalue}>{arrivalTime}</Text>
              </View>
            </View>
          </View>
          <View style={styles.lineBreak} />
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>To</Text>
              <Text style={styles.value}>{to}</Text>
            </View>
            <View>
              <View>
                <Text style={styles.label}>Flight Number</Text>
              </View>
              <View>
                <Text style={styles.value}>{flightNumber}</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.label}>Departure Terminal</Text>
              </View>
              <View>
                <Text style={styles.value}>{departureTerminal}</Text>
              </View>
            </View>
            <View>
              <View>
                <Text style={styles.label}>Arrival Terminal</Text>
              </View>
              <View>
                <Text style={styles.value}>{arrivalTerminal}</Text>
              </View>
            </View>
          </View>
          <View style={styles.lineBreak} />
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Seat Class</Text>
              <Text style={styles.value}>{seatClass}</Text>
            </View>
            <View>
              <Text style={styles.label}>Seat Number</Text>
              <Text style={styles.value}>{seatNumber}</Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.subheading}>Total Fare Breakdown</Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.subheading}>Fare Details</Text>
            <View style={{ marginBottom: 20 }}>
              <View style={styles.row}>
                <View>
                  <Text style={styles.label}>Base Fare</Text>
                </View>
                <View>
                  <Text style={styles.value}>14</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View>
                  <Text style={styles.label}>Taxes</Text>
                </View>
                <View>
                  <Text style={styles.value}>12</Text>
                </View>
              </View>
              <View style={styles.lineBreak2} />
              <View style={styles.row}>
                <View>
                  <Text style={styles.label}>Total Fare</Text>
                </View>
                <View>
                  <Text style={styles.value}>26</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.subheading}>Important Inforamtion</Text>
          <Text style={styles.simpleText}>
            Passengers are required to bring this Itinerary/Receipt along with
            an official ID with photo issued by the government or known
            corporations upon entering the terminal.
          </Text>
          <Text style={styles.simpleText}>
            The airline may contact the card holder or the passenger for
            verification of their payment, and in case the airline suspects or
            has a reason to believe that the ticket(s) purchased were made
            fraudulently, the airline may cancel the reservation made by the
            passenger.
          </Text>
          <Text style={styles.simpleText}>
            Passengers are recommended to check-in two hours before the
            scheduled departure time to prevent cancellation of passenger's
            reservation. The airline shall not be liable for loss or damages due
            to passenger's failure to comply with the provisions above if
            without fault by the airline.
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Privacy Policy</Text>
          <a href="www.google.com" style={{ marginBottom: 10 }}>
            <Text>https://www.duffleairways/privacypolicy</Text>
          </a>
        </View>
        <View>
          <Text style={styles.label}>Terms and Conditions</Text>
          <a href="www.google.com" style={{ marginBottom: 10 }}>
            <Text>https://www.duffleairways/termsandconditions</Text>
          </a>
        </View>
        <View>
          <Text style={styles.label}> Conditions of Carriage</Text>
          <Text style={styles.simpleText}>
            You can follow the link here to know more about the Conditions of
            Carriage:
          </Text>
          <a href="www.google.com" style={{ marginBottom: 10 }}>
            <Text>https://www.duffleairways/termsandconditions</Text>
          </a>
        </View>
        <View>
          <Text style={styles.label}>Restricted Items or Goods</Text>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.simpleText}>
              We reserve the right to confiscate any item or goods brought by
              the passenger which we believe might bring harm or threat to our
              guests, including the following:
            </Text>
            <View style={styles.listItem}>
              <Text>- Pointed or sharp objects</Text>
            </View>
            <View style={styles.listItem}>
              <Text>- Firearms and Ammunition</Text>
            </View>
            <View style={styles.listItem}>
              <Text>- Explosives or flammable substances</Text>
            </View>
            <View style={styles.listItem}>
              <Text>
                - Toys representing dangerous objects such as toy guns and
                knives
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text>- Aerosols</Text>
            </View>
            <View style={styles.listItem}>
              <Text>
                - Any other items which may be considered security hazards by
                law
              </Text>
            </View>
            <Text style={{ marginTop: 20 }}>
              For more information, please check out this link:
            </Text>
            <Text style={{ color: '#701644' }}>
              https://www.duffleairways.com/baggageinfo
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.label}>Contact Information</Text>
          <Text style={styles.simpleText}>
            If you have any questions or concerns about the services or any
            matter concerning your booking or reservation, please email
            reservations@duffleairways.com or call airline reservations at
            718-420-78601
          </Text>
        </View>
        <View style={styles.lineBreak2} />
        <View
          style={{ width: '90%', alignSelf: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: '#701644', fontSize: 16 }}>
            THANK YOU FOR MAKING US YOUR AIRLINE OF CHOICE!
          </Text>
          <Text style={{ color: '#701644', fontSize: 16 }}>
            HAVE A SAFE FLIGHT!
          </Text>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
export default FlightDetailsPdf;
