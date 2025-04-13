import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { WisdomRepository, Bookmark } from '../persistent/AsyncStorage';
import { BuddhistWisdom } from "@/persistent/wisdom"
import { Ionicons } from '@expo/vector-icons';


export default function WisdomBookmark() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        try {
            const bookmarks = await WisdomRepository.getBookmarks();
            setBookmarks(bookmarks);
        } catch (error) {
            console.error('Error loading bookmarks:', error);
            setBookmarks([]);
        }
    };

    const handleDeleteBookmark = async (bookmark: Bookmark) => {
        Alert.alert(
            "Xóa lời dạy",
            "Bạn có chắc chắn muốn xóa lời dạy này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const afterUpdate = await WisdomRepository.deleteBookmark(bookmark)
                            setBookmarks(afterUpdate);
                        } catch (error) {
                            console.error('Error deleting bookmark:', error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Header title="Lời dạy của Phật" showBack={true} />
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.scrollViewContent,
                    { paddingBottom: insets.bottom + 16 }
                ]}
            >
                {bookmarks.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Chưa có lời dạy nào</Text>
                    </View>
                ) : (
                    bookmarks.map((bookmark) => (
                        <View
                            key={bookmark.ts}
                            style={styles.card}
                        >
                            <View style={styles.cardHeader}>
                                <Text style={styles.timestampText}>
                                    {bookmark.intent.emoji} {new Date(bookmark.ts).toLocaleDateString('vi-VN', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        formatMatcher: 'basic'
                                    }).replace('ngày ', '')}
                                </Text>
                                <TouchableOpacity 
                                    onPress={() => handleDeleteBookmark(bookmark.wisdom)}
                                    style={styles.deleteButton}
                                >
                                    <Ionicons name="trash-outline" size={16}
                                        color="#91a996" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.quoteSection}>  
                                <Text style={styles.quoteText}>"{bookmark.wisdom.quote}"</Text>
                            </View>
                            <View style={styles.authorSection}>
                                <Text style={styles.authorText}>— {bookmark.wisdom.author}</Text>
                            </View>
                            <View style={styles.reflectionSection}>
                                <Text style={styles.reflectionLabel}>Suy ngẫm:</Text>
                                <Text style={styles.reflectionText}>{bookmark.wisdom.reflection}</Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f6ef',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        padding: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: '#6B7280',
    },
    card: {
        backgroundColor: '#f5f6ef',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#dfe5e6',
        marginTop: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    timestampText: {
        fontSize: 13,
        color: '#77867b',
        fontWeight: 500
    },
    deleteButton: {
        padding: 4
    },

    quoteSection: {
        padding: 16,
        marginBottom: 8,
    },
    quoteText: {
        fontSize: 18,
        color: '#3a4a42',
        lineHeight: 28,
        textAlign: 'left'
    },
    authorSection: {
        paddingHorizontal: 16,
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    authorText: {
        fontSize: 14,
        color: '#4B5563',
        fontStyle: 'italic',
    },
    reflectionSection: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        marginTop: 8,
        backgroundColor: '#f5f5f5',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    reflectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4c5950',
        marginBottom: 8,
    },
    reflectionText: {
        fontSize: 14,
        color: '#7f8f88',
        lineHeight: 20,
    },
});