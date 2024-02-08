import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#E4E4E4',
        padding: 10
    },
    section: {
        margin: 10,
        padding: 10,
    },
    flexSection: {
        display: 'flex',
        fontSize: '16px',
        justifyContent: 'space-between',
        flexDirection: 'column',
        gap: 2,
        margin:'20px',
    }
});

const convertDate = (date: Date) => {
    const _date = new Date(date);
    const day = _date.getDate();
    const month = _date.toLocaleString('default', { month: 'long' }); // Get full month name
    const year = _date.getFullYear();
    return `${day} ${month} ${year}`;
}

// Create Document Component
const MyDocument = ({ user, latestLicence }: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Test Licence</Text>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10
            }}>
                <View style={styles.flexSection}>
                    <Text>Name: {user.firstName} {user.lastName}</Text>
                    <Text>Phone: {user.phoneNumber}</Text>
                    <Text>Address: {user.address}</Text>
                    <Text>Email: {user.email}</Text>
                </View>
                <View style={styles.flexSection}>
                    <Text
                        style={{
                            color:'green'
                        }}
                    >Overall : {latestLicence.overall}</Text>
                    <Text>Total Question: {latestLicence.totalQuestions}</Text>
                    <Text>Correct: {latestLicence.correct}</Text>
                    <Text>Exam Date: {convertDate(latestLicence.createdAt)}</Text>
                    <Text>valid till: {convertDate(latestLicence.validTill)}</Text>
                </View>
            </View>
            <View style={{
                marginTop: '20px',
                marginBottom: '20px',
            }}>
                <Text>
                    Category wise performance
                </Text>
            </View>
            <View style={styles.flexSection}>
                <Text
                    style={{
                        fontWeight: 'bold'
                    }}
                >{latestLicence.categoryWisePerformance[0].category}</Text>
                <Text>Total: {latestLicence.categoryWisePerformance[0].totalQuestions}</Text>
                <Text>Correct: {latestLicence.categoryWisePerformance[0].correct}</Text>
            </View>
            <View style={styles.flexSection}>
                <Text
                    style={{
                        fontWeight: 'bold'
                    }}
                >{latestLicence.categoryWisePerformance[1].category}</Text>
                <Text>Total: {latestLicence.categoryWisePerformance[1].totalQuestions}</Text>
                <Text>Correct: {latestLicence.categoryWisePerformance[1].correct}</Text>
            </View>
            <View style={styles.flexSection}>
                <Text
                    style={{
                        fontWeight: 'bold'
                    }}
                >{latestLicence.categoryWisePerformance[2].category}</Text>
                <Text>Total: {latestLicence.categoryWisePerformance[2].totalQuestions}</Text>
                <Text>Correct: {latestLicence.categoryWisePerformance[2].correct}</Text>
            </View>
        </Page>
    </Document>
);
const LicencePdfPage = () => {
    const location = useLocation();
    const latestLicence = location.state;
    const user = useUserStore((state) => state.user);
    if(!user || !latestLicence) return (
        <div>
            Error while generating pdf
        </div>
    );
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <PDFDownloadLink document={<MyDocument
                user={user}
                latestLicence={latestLicence}
            />} fileName="licence.pdf">
                {({ loading }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
        </div>
    );
}
export default LicencePdfPage;