import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Svg, Path, G, Rect, Defs, ClipPath, Image } from '@react-pdf/renderer';

// --- Register Fonts ---
// We use public stable URLs for fonts to ensure consistency across environments.
Font.register({
    family: 'Orbitron',
    src: 'https://github.com/google/fonts/raw/f1943c224213d22e4c29759d57a41ec58e658933/ofl/orbitron/static/Orbitron-Regular.ttf'
});

Font.register({
    family: 'IBMPlexSans',
    src: 'https://github.com/google/fonts/raw/main/apache/ibmplexsans/static/IBMPlexSans-Regular.ttf'
});

// --- PDF Specific Components (Ported from CertificateTemplate.tsx) ---

const PDFHackBoatsLogo: React.FC = () => (
    <Image 
        src="/logo.png" 
        style={{ width: 180, height: 'auto' }} 
    />
);

const PDFBotFace: React.FC = () => (
    <Svg width="180" height="180" viewBox="0 0 162 162">
        <G opacity={0.33}>
            <Path d="M0.5 90.1818V55.2727L160.5 52.3636V90.1818H0.5Z" fill="#1496D2" />
            <Path d="M80.5 0.5C115.521 0.500002 144 32.1339 144 71.2725C144 110.411 115.521 142.046 80.5 142.046C45.4792 142.046 17 110.411 17 71.2725C17.0001 32.1339 45.4793 0.5 80.5 0.5Z" fill="#37A5D7" />
            <Path d="M0.5 160V122.182H143.167L160.5 160H0.5Z" fill="#1496D2" />
            <Path d="M53.8333 75.6364C53.8333 86.8825 45.4793 96 35.1666 96C24.8539 96 16.5 86.8825 16.5 75.6364C16.5 64.3903 24.8539 55.2727 35.1666 55.2727C45.4793 55.2727 53.8333 64.3903 53.8333 75.6364Z" fill="white" />
            <Path d="M107.167 75.6364C107.167 86.8825 98.8126 96 88.5 96C78.1874 96 69.8333 86.8825 69.8333 75.6364C69.8333 64.3903 78.1874 55.2727 88.5 55.2727C98.8126 55.2727 107.167 64.3903 107.167 75.6364Z" fill="white" />
        </G>
    </Svg>
);

const PDFRightBar: React.FC = () => (
    <Svg style={styles.rightBar} viewBox="0 0 72 595">
        <Path d="M0 196V0H72V189C72 189 58 193.5 47 189C36 184.5 27 180.406 17 185C9.71884 188.345 0 196 0 196Z" fill="#154854" />
        <Path d="M21 190.5C10.2304 194.957 0 205 0 205V388.936C0 388.936 5.8751 397.563 15.5 399.709C25.1249 401.854 36.6511 391.527 47 388.936C57.3489 386.345 72 395.215 72 395.215V195.5C72 195.5 58.3621 199.994 48 195.5C37.6379 191.006 31.7696 186.043 21 190.5Z" fill="#D2DF64" />
        <Path d="M23.5 406.5C13.5705 410.017 0 399 0 399V595H72V402.5C72 402.5 62.8442 396.233 51 396C39.1558 395.767 33.4295 402.983 23.5 406.5Z" fill="#FF5C5C" />
    </Svg>
);

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
        position: 'relative',
        fontFamily: 'IBMPlexSans',
    },
    rightBar: {
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: 80,
    },
    container: {
        padding: 48,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        marginBottom: 40,
    },
    headerTextContainer: {
        marginBottom: 32,
        alignItems: 'center',
    },
    certificateTitle: {
        fontFamily: 'Orbitron',
        fontSize: 60,
        color: '#000000',
        letterSpacing: 2,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Orbitron',
        fontSize: 18,
        color: '#4B5563',
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
    mainContent: {
        alignItems: 'center',
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        color: '#374151',
        textTransform: 'uppercase',
        letterSpacing: 4,
        marginBottom: 16,
    },
    recipientName: {
        fontSize: 48,
        color: '#000000',
        borderBottomWidth: 3,
        borderBottomColor: '#f3f4f6',
        paddingBottom: 8,
        marginBottom: 24,
    },
    courseName: {
        fontSize: 36,
        color: '#FF5B5B',
        marginBottom: 16,
    },
    platformName: {
        fontSize: 12,
        color: '#9CA3AF',
        letterSpacing: 5,
        textTransform: 'uppercase',
    },
    botFaceContainer: {
        position: 'absolute',
        bottom: 0,
        left: 32,
        opacity: 0.8,
    },
    bottomInfo: {
        position: 'absolute',
        bottom: 48,
        right: 96,
        alignItems: 'center',
    },
    stamp: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        marginBottom: 8,
    },
    stampTitle: {
        fontFamily: 'Orbitron',
        fontSize: 11,
        color: '#1D1D1F',
        opacity: 0.8,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    stampDivider: {
        width: 50,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginVertical: 4,
    },
    id: {
        fontSize: 10,
        color: '#1D1D1F',
        fontFamily: 'IBMPlexSans',
        letterSpacing: 2,
        textTransform: 'uppercase',
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        paddingTop: 4,
        marginTop: 8,
    },
    verifyUrl: {
        fontSize: 7,
        color: '#1D1D1F',
        fontFamily: 'IBMPlexSans',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: 4,
    },
    date: {
        fontSize: 10,
        color: '#1D1D1F',
        fontFamily: 'IBMPlexSans',
        marginTop: 4,
    }
});

interface PDFCertificateProps {
    recipientName: string;
    courseName: string;
    date: string;
    certificateId: string;
    verificationToken?: string;
}

export const PDFCertificate: React.FC<PDFCertificateProps> = ({ recipientName, courseName, date, certificateId, verificationToken }) => (
    <Document>
        <Page size="A4" orientation="landscape" style={styles.page}>
            <PDFRightBar />

            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <PDFHackBoatsLogo />
                </View>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.certificateTitle}>CERTIFICATE</Text>
                    <Text style={styles.subtitle}>OF COMPLETION</Text>
                </View>

                <View style={styles.mainContent}>
                    <Text style={styles.label}>This certifies that</Text>
                    <Text style={styles.recipientName}>{recipientName.toUpperCase()}</Text>
                    <Text style={styles.label}>has successfully completed</Text>
                    <Text style={styles.courseName}>{courseName}</Text>
                    <Text style={styles.platformName}>HACKBOATS LEARNING PLATFORM</Text>
                </View>

                {/* Bottom Footer Section */}
                <View style={styles.bottomInfo}>
                    <View style={styles.stamp}>
                        <Text style={styles.stampTitle}>CERTIFIED</Text>
                        <View style={styles.stampDivider} />
                        <Text style={styles.stampTitle}>HACKBOATS</Text>
                    </View>
                    <Text style={styles.id}>ID: {certificateId}</Text>
                    <Text style={styles.verifyUrl}>VERIFY AT HACKBOATS.COM/CERTIFICATION/VERIFY/{certificateId}{verificationToken ? `?TOKEN=${verificationToken.toUpperCase()}` : ''}</Text>
                    <Text style={styles.date}>{date}</Text>
                </View>

                <View style={styles.botFaceContainer}>
                    <PDFBotFace />
                </View>
            </View>
        </Page>
    </Document>
);
