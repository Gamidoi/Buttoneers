import { getApprovedPosts } from 'backend/communityPosts.jsw';
  import { currentMember } from 'wix-members';
  
  $w.onReady(async function () {
    $w('#noPostsText').hide();
    $w('#writePostBtn').hide();
    
    const member = await currentMember.getMember();
    if (member) $w('#writePostBtn').show();
    
    const posts = await getApprovedPosts();
    if (posts.length === 0) {
      $w('#noPostsText').show();
      $w('#postRepeater').hide();
      return;
    } 
    $w('#postRepeater').data = posts;
    $w('#postRepeater').onItemReady(($item, itemData) => {
      $item('#titleText').text = itemData.title;
      $item('#contentText').text = itemData.content;
      $item('#authorText').text = 'By ' + itemData.authorName;
    });
  });
