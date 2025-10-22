import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Alert, Switch } from 'react-native';
import { ChevronLeft, Bell, Globe, Palette, Shield, Moon, Smartphone, Volume2, Mail, MessageSquare } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: any;
  type: 'toggle' | 'navigation' | 'selection';
  value?: boolean;
  options?: string[];
  selectedOption?: string;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function SettingsScreen() {
  const { isSmallDevice, isMediumDevice } = useAppContext();
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
    darkMode: false,
    autoTheme: true,
    biometricLogin: true,
    twoFactorAuth: true,
    language: 'English',
    currency: 'USD',
    timezone: 'EST'
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Notifications',
      items: [
        {
          id: 'push',
          title: 'Push Notifications',
          subtitle: 'Receive push notifications on this device',
          icon: <Bell size={20} color="#4B7BF5" />,
          type: 'toggle' as const,
          value: settings.pushNotifications,
          onToggle: (value: boolean) => updateSetting('pushNotifications', value)
        },
        {
          id: 'email',
          title: 'Email Notifications',
          subtitle: 'Order updates and account information',
          icon: <Mail size={20} color="#4B7BF5" />,
          type: 'toggle' as const,
          value: settings.emailNotifications,
          onToggle: (value: boolean) => updateSetting('emailNotifications', value)
        },
        {
          id: 'sms',
          title: 'SMS Notifications',
          subtitle: 'Important alerts via text message',
          icon: <MessageSquare size={20} color="#4B7BF5" />,
          type: 'toggle' as const,
          value: settings.smsNotifications,
          onToggle: (value: boolean) => updateSetting('smsNotifications', value)
        },
        {
          id: 'orders',
          title: 'Order Updates',
          subtitle: 'Shipping and delivery notifications',
          icon: <Volume2 size={20} color="#4B7BF5" />,
          type: 'toggle' as const,
          value: settings.orderUpdates,
          onToggle: (value: boolean) => updateSetting('orderUpdates', value)
        }
      ]
    },
    {
      title: 'Appearance',
      items: [
        {
          id: 'theme',
          title: 'Theme',
          subtitle: settings.autoTheme ? 'Auto (System)' : settings.darkMode ? 'Dark' : 'Light',
          icon: <Palette size={20} color="#4B7BF5" />,
          type: 'navigation' as const,
          onPress: () => showThemeOptions()
        },
        {
          id: 'darkMode',
          title: 'Dark Mode',
          subtitle: 'Use dark theme',
          icon: <Moon size={20} color="#4B7BF5" />,
          type: 'toggle' as const,
          value: settings.darkMode,
          onToggle: (value: boolean) => {
            updateSetting('darkMode', value);
            updateSetting('autoTheme', false);
          }
        }
      ]
    },
    {
      title: 'Language & Region',
      items: [
        {
          id: 'language',
          title: 'Language',
          subtitle: settings.language,
          icon: <Globe size={20} color="#4B7BF5" />,
          type: 'navigation' as const,
          onPress: () => showLanguageOptions()
        },
        {
          id: 'currency',
          title: 'Currency',
          subtitle: settings.currency,
          icon: <Globe size={20} color="#4B7BF5" />,
          type: 'navigation' as const,
          onPress: () => showCurrencyOptions()
        }
      ]
    },
    {
      title: 'Privacy & Security',
      items: [
        {
          id: 'biometric',
          title: 'Biometric Login',
          subtitle: 'Use Touch ID or Face ID',
          icon: <Smartphone size={20} color="#4B7BF5" />,
          type: 'toggle' as const,
          value: settings.biometricLogin,
          onToggle: (value: boolean) => {
            if (value) {
              Alert.alert(
                'Enable Biometric Login',
                'Use your fingerprint or face to log in quickly and securely.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Enable', onPress: () => updateSetting('biometricLogin', true) }
                ]
              );
            } else {
              updateSetting('biometricLogin', false);
            }
          }
        },
        {
          id: '2fa',
          title: 'Two-Factor Authentication',
          subtitle: 'Extra security for your account',
          icon: <Shield size={20} color="#4B7BF5" />,
          type: 'toggle' as const,
          value: settings.twoFactorAuth,
          onToggle: (value: boolean) => {
            if (value) {
              show2FASetup();
            } else {
              Alert.alert(
                'Disable 2FA',
                'Are you sure? This will make your account less secure.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Disable', style: 'destructive', onPress: () => updateSetting('twoFactorAuth', false) }
                ]
              );
            }
          }
        },
        {
          id: 'privacy',
          title: 'Privacy Settings',
          subtitle: 'Data sharing and privacy controls',
          icon: <Shield size={20} color="#4B7BF5" />,
          type: 'navigation' as const,
          onPress: () => showPrivacySettings()
        }
      ]
    }
  ];

  const showThemeOptions = () => {
    Alert.alert(
      'Choose Theme',
      'Select your preferred app theme:',
      [
        { text: 'Auto (System)', onPress: () => {
          updateSetting('autoTheme', true);
          updateSetting('darkMode', false);
        }},
        { text: 'Light', onPress: () => {
          updateSetting('autoTheme', false);
          updateSetting('darkMode', false);
        }},
        { text: 'Dark', onPress: () => {
          updateSetting('autoTheme', false);
          updateSetting('darkMode', true);
        }},
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showLanguageOptions = () => {
    const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
    Alert.alert(
      'Select Language',
      'Choose your preferred language:',
      [
        ...languages.map(lang => ({
          text: lang,
          onPress: () => updateSetting('language', lang)
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showCurrencyOptions = () => {
    const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'];
    Alert.alert(
      'Select Currency',
      'Choose your preferred currency:',
      [
        ...currencies.map(curr => ({
          text: curr,
          onPress: () => updateSetting('currency', curr)
        })),
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const show2FASetup = () => {
    Alert.alert(
      'Set Up Two-Factor Authentication',
      'Choose your preferred 2FA method:\n\n📱 Authenticator App\n• Google Authenticator\n• Authy\n• Microsoft Authenticator\n\n📧 Email Verification\n• Send codes to your email\n\n📱 SMS Verification\n• Send codes to your phone',
      [
        { text: 'Authenticator App', onPress: () => {
          Alert.alert('2FA Enabled!', 'Two-factor authentication has been enabled with authenticator app.');
          updateSetting('twoFactorAuth', true);
        }},
        { text: 'Email', onPress: () => {
          Alert.alert('2FA Enabled!', 'Two-factor authentication has been enabled with email verification.');
          updateSetting('twoFactorAuth', true);
        }},
        { text: 'SMS', onPress: () => {
          Alert.alert('2FA Enabled!', 'Two-factor authentication has been enabled with SMS verification.');
          updateSetting('twoFactorAuth', true);
        }},
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showPrivacySettings = () => {
    Alert.alert(
      'Privacy Settings',
      'Demo Privacy Controls:\n\n📊 Data Collection\n• Analytics: Enabled\n• Crash Reports: Enabled\n• Usage Data: Enabled\n\n🎯 Personalization\n• Personalized Ads: Disabled\n• Location Tracking: Disabled\n• Purchase History: Private\n\n🔗 Data Sharing\n• Third-party Sharing: Disabled\n• Marketing Partners: Disabled',
      [
        { text: 'Manage Data', onPress: () => Alert.alert('Data Management', 'Demo: Download, delete, or export your personal data.') },
        { text: 'Privacy Policy', onPress: () => Alert.alert('Privacy Policy', 'Demo: View our comprehensive privacy policy and terms of service.') },
        { text: 'OK' }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 18 : 20 }]}>
          Settings
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={[styles.section, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>
            <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 14 : 16 }]}>
              {section.title}
            </Text>
            <View style={styles.sectionItems}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingItem,
                    itemIndex === section.items.length - 1 && styles.lastItem
                  ]}
                  onPress={item.onPress}
                  disabled={item.type === 'toggle'}
                  activeOpacity={item.type === 'navigation' ? 0.7 : 1}
                >
                  <View style={styles.settingLeft}>
                    <View style={styles.iconContainer}>
                      {item.icon}
                    </View>
                    <View style={styles.settingContent}>
                      <Text style={[styles.settingTitle, { fontSize: isSmallDevice ? 14 : 16 }]}>
                        {item.title}
                      </Text>
                      {item.subtitle && (
                        <Text style={[styles.settingSubtitle, { fontSize: isSmallDevice ? 12 : 14 }]}>
                          {item.subtitle}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.settingRight}>
                    {item.type === 'toggle' && item.onToggle && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#E0E0E0', true: '#4B7BF5' }}
                        thumbColor="#FFF"
                      />
                    )}
                    {item.type === 'navigation' && (
                      <Text style={[styles.navArrow, { fontSize: isSmallDevice ? 16 : 18 }]}>›</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    padding: 16,
    paddingBottom: 8,
  },
  sectionItems: {
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F2',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrow: {
    fontFamily: 'Inter-Regular',
    color: '#999',
    fontWeight: 'bold',
  },
});
