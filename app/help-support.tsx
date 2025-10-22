import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Platform,
  Linking,
} from 'react-native';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Send,
  ExternalLink,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

export default function HelpSupportScreen() {
  const { isSmallDevice, isMediumDevice } = useAppContext();

  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'feedback'>('faq');
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'How do I track my order?',
      answer: 'You can track your order by going to "My Orders" in your profile. Click on any order to see detailed tracking information including estimated delivery time and current status.',
      expanded: false,
    },
    {
      id: '2',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some restrictions apply to certain product categories like electronics and perishables.',
      expanded: false,
    },
    {
      id: '3',
      question: 'How do I cancel an order?',
      answer: 'Orders can be cancelled within 2 hours of placement if they haven\'t been processed yet. Go to "My Orders" and click "Cancel Order" next to the relevant order.',
      expanded: false,
    },
    {
      id: '4',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers in some regions.',
      expanded: false,
    },
    {
      id: '5',
      question: 'How do I change my shipping address?',
      answer: 'You can manage your addresses in the "My Addresses" section of your profile. You can add new addresses, edit existing ones, or set a default shipping address.',
      expanded: false,
    },
    {
      id: '6',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination. International orders may be subject to customs duties and taxes.',
      expanded: false,
    },
  ]);

  const [feedbackForm, setFeedbackForm] = useState({
    subject: '',
    message: '',
    email: '',
    type: 'general' as 'general' | 'complaint' | 'suggestion' | 'technical',
  });

  const getIconSize = () => {
    if (isSmallDevice) return 20;
    if (isMediumDevice) return 22;
    return 24;
  };

  const iconSize = getIconSize();

  const toggleFAQ = (faqId: string) => {
    setFaqs(prev =>
      prev.map(faq =>
        faq.id === faqId ? { ...faq, expanded: !faq.expanded } : faq
      )
    );
  };

  const handleContact = (method: 'phone' | 'email' | 'chat') => {
    switch (method) {
      case 'phone':
        Linking.openURL('tel:+1-800-123-4567').catch(() =>
          Alert.alert('Error', 'Unable to open phone app')
        );
        break;
      case 'email':
        Linking.openURL('mailto:support@example.com').catch(() =>
          Alert.alert('Error', 'Unable to open email app')
        );
        break;
      case 'chat':
        Alert.alert(
          'Live Chat',
          'Live chat is available Monday-Friday 9AM-6PM EST. Would you like to start a chat session?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Start Chat', onPress: () => Alert.alert('Demo', 'Live chat would open here') },
          ]
        );
        break;
    }
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackForm.subject || !feedbackForm.message || !feedbackForm.email) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(feedbackForm.email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    Alert.alert(
      'Feedback Submitted',
      'Thank you for your feedback! We\'ll review it and get back to you within 24-48 hours.',
      [
        {
          text: 'OK',
          onPress: () => {
            setFeedbackForm({
              subject: '',
              message: '',
              email: '',
              type: 'general',
            });
          },
        },
      ]
    );
  };

  const renderFAQTab = () => (
    <View style={[styles.tabContent, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>
      <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
        Frequently Asked Questions
      </Text>
      
      {faqs.map((faq, index) => (
        <View
          key={faq.id}
          style={[
            styles.faqItem,
            { marginBottom: index === faqs.length - 1 ? 0 : 12 },
          ]}
        >
          <TouchableOpacity
            style={styles.faqHeader}
            onPress={() => toggleFAQ(faq.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.faqQuestion, { fontSize: isSmallDevice ? 14 : 16 }]}>
              {faq.question}
            </Text>
            {faq.expanded ? (
              <ChevronDown size={iconSize} color="#4B7BF5" />
            ) : (
              <ChevronRight size={iconSize} color="#666" />
            )}
          </TouchableOpacity>
          
          {faq.expanded && (
            <View style={styles.faqAnswer}>
              <Text style={[styles.faqAnswerText, { fontSize: isSmallDevice ? 13 : 14 }]}>
                {faq.answer}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );

  const renderContactTab = () => (
    <View style={[styles.tabContent, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>
      <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
        Contact Us
      </Text>
      
      <View style={styles.contactOptions}>
        <TouchableOpacity
          style={styles.contactOption}
          onPress={() => handleContact('phone')}
          activeOpacity={0.7}
        >
          <View style={styles.contactIconContainer}>
            <Phone size={iconSize} color="#4B7BF5" />
          </View>
          <View style={styles.contactContent}>
            <Text style={[styles.contactTitle, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Phone Support
            </Text>
            <Text style={[styles.contactSubtitle, { fontSize: isSmallDevice ? 12 : 13 }]}>
              +1 (800) 123-4567
            </Text>
            <Text style={[styles.contactHours, { fontSize: isSmallDevice ? 11 : 12 }]}>
              Mon-Fri 9AM-6PM EST
            </Text>
          </View>
          <ExternalLink size={iconSize - 4} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactOption}
          onPress={() => handleContact('email')}
          activeOpacity={0.7}
        >
          <View style={styles.contactIconContainer}>
            <Mail size={iconSize} color="#4B7BF5" />
          </View>
          <View style={styles.contactContent}>
            <Text style={[styles.contactTitle, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Email Support
            </Text>
            <Text style={[styles.contactSubtitle, { fontSize: isSmallDevice ? 12 : 13 }]}>
              support@example.com
            </Text>
            <Text style={[styles.contactHours, { fontSize: isSmallDevice ? 11 : 12 }]}>
              Response within 24 hours
            </Text>
          </View>
          <ExternalLink size={iconSize - 4} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactOption}
          onPress={() => handleContact('chat')}
          activeOpacity={0.7}
        >
          <View style={styles.contactIconContainer}>
            <MessageCircle size={iconSize} color="#4B7BF5" />
          </View>
          <View style={styles.contactContent}>
            <Text style={[styles.contactTitle, { fontSize: isSmallDevice ? 14 : 16 }]}>
              Live Chat
            </Text>
            <Text style={[styles.contactSubtitle, { fontSize: isSmallDevice ? 12 : 13 }]}>
              Chat with our support team
            </Text>
            <Text style={[styles.contactHours, { fontSize: isSmallDevice ? 11 : 12 }]}>
              Mon-Fri 9AM-6PM EST
            </Text>
          </View>
          <View style={styles.liveBadge}>
            <Text style={[styles.liveText, { fontSize: isSmallDevice ? 10 : 11 }]}>
              LIVE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFeedbackTab = () => (
    <View style={[styles.tabContent, { marginHorizontal: isSmallDevice ? 16 : 20 }]}>
      <Text style={[styles.sectionTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
        Send Feedback
      </Text>
      
      <View style={styles.feedbackForm}>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
            Feedback Type
          </Text>
          <View style={styles.typeButtons}>
            {[
              { key: 'general', label: 'General' },
              { key: 'complaint', label: 'Complaint' },
              { key: 'suggestion', label: 'Suggestion' },
              { key: 'technical', label: 'Technical' },
            ].map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.typeButton,
                  feedbackForm.type === key && styles.typeButtonActive,
                ]}
                onPress={() => setFeedbackForm(prev => ({ ...prev, type: key as any }))}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    { fontSize: isSmallDevice ? 12 : 14 },
                    feedbackForm.type === key && styles.typeButtonTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
            Subject *
          </Text>
          <TextInput
            style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
            value={feedbackForm.subject}
            onChangeText={(value) => setFeedbackForm(prev => ({ ...prev, subject: value }))}
            placeholder="Brief description of your feedback"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
            Your Email *
          </Text>
          <TextInput
            style={[styles.textInput, { fontSize: isSmallDevice ? 14 : 16 }]}
            value={feedbackForm.email}
            onChangeText={(value) => setFeedbackForm(prev => ({ ...prev, email: value }))}
            placeholder="your.email@example.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { fontSize: isSmallDevice ? 14 : 16 }]}>
            Message *
          </Text>
          <TextInput
            style={[
              styles.textInput,
              styles.textArea,
              { fontSize: isSmallDevice ? 14 : 16 },
            ]}
            value={feedbackForm.message}
            onChangeText={(value) => setFeedbackForm(prev => ({ ...prev, message: value }))}
            placeholder="Please provide detailed feedback..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
          <Send size={iconSize - 4} color="#FFF" />
          <Text style={[styles.submitButtonText, { fontSize: isSmallDevice ? 14 : 16 }]}>
            Send Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={iconSize} color="#333" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: isSmallDevice ? 16 : 18 }]}>
          Help & Support
        </Text>
        <View style={{ width: iconSize + 16 }} />
      </View>

      {/* Tab Navigation */}
      <View style={[styles.tabNavigation, { paddingHorizontal: isSmallDevice ? 16 : 20 }]}>
        {[
          { key: 'faq', label: 'FAQ', icon: HelpCircle },
          { key: 'contact', label: 'Contact', icon: Phone },
          { key: 'feedback', label: 'Feedback', icon: MessageCircle },
        ].map(({ key, label, icon: Icon }) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.tabButton,
              activeTab === key && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(key as any)}
          >
            <Icon
              size={iconSize - 4}
              color={activeTab === key ? '#4B7BF5' : '#666'}
            />
            <Text
              style={[
                styles.tabButtonText,
                { fontSize: isSmallDevice ? 12 : 14 },
                activeTab === key && styles.tabButtonTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {activeTab === 'faq' && renderFAQTab()}
        {activeTab === 'contact' && renderContactTab()}
        {activeTab === 'feedback' && renderFeedbackTab()}
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
    borderBottomColor: '#E5E5E7',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#4B7BF5',
  },
  tabButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#666',
    marginTop: 4,
  },
  tabButtonTextActive: {
    color: '#4B7BF5',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingTop: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestion: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F2',
  },
  faqAnswerText: {
    fontFamily: 'Inter-Regular',
    color: '#666',
    lineHeight: 20,
  },
  contactOptions: {
    gap: 12,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    marginBottom: 2,
  },
  contactSubtitle: {
    fontFamily: 'Inter-Medium',
    color: '#4B7BF5',
    marginBottom: 2,
  },
  contactHours: {
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  liveBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  liveText: {
    fontFamily: 'Inter-Bold',
    color: '#FFF',
  },
  feedbackForm: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginBottom: 8,
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 20,
    backgroundColor: '#FAFAFA',
  },
  typeButtonActive: {
    borderColor: '#4B7BF5',
    backgroundColor: '#4B7BF5',
  },
  typeButtonText: {
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#FFF',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4B7BF5',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: '#FFF',
    marginLeft: 8,
  },
});
