import { supabase } from './supabaseClient'

const VISITOR_ID_KEY = 'guestbook_visitor_id'
const LIKED_ENTRIES_KEY = 'guestbook_liked_entries'

export function getVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY)
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    localStorage.setItem(VISITOR_ID_KEY, visitorId)
  }
  return visitorId
}

export function getLikedEntryIds() {
  const raw = localStorage.getItem(LIKED_ENTRIES_KEY)
  return raw ? JSON.parse(raw) : []
}

function markEntryLiked(entryId) {
  const liked = getLikedEntryIds()
  localStorage.setItem(LIKED_ENTRIES_KEY, JSON.stringify([...liked, entryId]))
}

export async function fetchGuestbookEntries() {
  const { data, error } = await supabase
    .from('guestbook_entries')
    .select('id, parent_id, author_name, message, sns_handle, emoji, rating, created_at, guestbook_likes(count)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createGuestbookEntry({ authorName, message, snsHandle, emoji, rating, email, parentId }) {
  const { data, error } = await supabase
    .from('guestbook_entries')
    .insert({
      author_name: authorName,
      message,
      sns_handle: snsHandle || null,
      emoji: emoji || null,
      rating: rating || null,
      parent_id: parentId || null,
    })
    .select()
    .single()
  if (error) throw error

  if (email) {
    const { error: emailError } = await supabase
      .from('guestbook_contact_emails')
      .insert({ entry_id: data.id, email })
    if (emailError) throw emailError
  }

  return data
}

export async function likeGuestbookEntry(entryId) {
  const visitorId = getVisitorId()
  const { error } = await supabase
    .from('guestbook_likes')
    .insert({ entry_id: entryId, visitor_id: visitorId })
  if (error) throw error
  markEntryLiked(entryId)
}
