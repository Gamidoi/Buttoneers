
  import { submitPost } from 'backend/communityPosts.web.js';
  import { currentMember } from 'wix-members';
  import wixWindow from 'wix-window';
  import wixLocation from 'wix-location';
  
  $w.onReady(async function () {
    $w('#successMsg').hide();
    $w('#errorMsg').hide();
    
    const member = await currentMember.getMember();
    if (!member) { 
      await wixWindow.openLightbox('Log In');
      const check = await currentMember.getMember();
      if (!check) { wixLocation.to('/'); return; }
    } 
    
    $w('#submitBtn').onClick(async () => {
      const title = $w('#titleInput').value.trim();
      const content = $w('#contentInput').value.trim();
      if (!title || !content) {
        $w('#errorMsg').text = 'Please fill in both title and content.';
        $w('#errorMsg').show();
        return;
      } 
      $w('#submitBtn').disable();
      $w('#errorMsg').hide();
      try {
        console.log('submitPost submitBtn on click');
        await submitPost(title, content);
        $w('#titleInput').value = '';
        $w('#contentInput').value = '';
        $w('#successMsg').show(); 
      } catch (e) {
        $w('#errorMsg').text = 'Submission failed. Please try again.';
        $w('#errorMsg').show();
      } finally {
        $w('#submitBtn').enable();
      }
    });
  });
