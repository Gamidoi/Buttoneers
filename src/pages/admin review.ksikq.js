
  import { getPendingPosts, approvePost, rejectPost } from 'backend/communityPosts.web.js';
  import { currentMember } from 'wix-members';
  import wixLocation from 'wix-location';
  
  let posts = [];
  
  $w.onReady(async function () {
    $w('#postRepeater').hide();
    $w('#noPendingText').hide();
    
    const member = await currentMember.getMember();
	console.log(member);
    if (!member) { wixLocation.to('/'); return; }
    
    const roles = await currentMember.getRoles();
	console.log(roles[0].title);
    if (!roles.some(r => r.title === 'Moderator') && !roles.some(r => r.title === 'Admin')) { wixLocation.to('/'); return; }
	console.log("filtered to admins");

    posts = await getPendingPosts();
	console.log(posts);
    if (posts.length === 0) { $w('#noPendingText').show(); return; }
	
    $w('#postRepeater').data = posts;
    $w('#postRepeater').onItemReady(($item, itemData) => {
      $item('#titleText').text = itemData.title;
      $item('#contentText').text = itemData.content;
      $item('#authorText').text = 'By ' + itemData.authorName;
      $item('#approveBtn').onClick(async () => {
        await approvePost(itemData._id); 
        posts = posts.filter(p => p._id !== itemData._id);
        $w('#postRepeater').data = posts;
        if (posts.length === 0) { $w('#postRepeater').hide(); $w('#noPendingText').show(); }
      });
      $item('#rejectBtn').onClick(async () => {
        await rejectPost(itemData._id); 
        posts = posts.filter(p => p._id !== itemData._id);
        $w('#postRepeater').data = posts;
        if (posts.length === 0) { $w('#postRepeater').hide(); $w('#noPendingText').show(); }
      });
    });
    $w('#postRepeater').show();
  });
