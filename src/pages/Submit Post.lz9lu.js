
  import { submitPost } from 'backend/communityPosts.jsw';
  import { currentMember } from 'wix-members';
  import wixWindow from 'wix-window';
  import wixLocation from 'wix-location';

  $w.onReady(async function () {
    $w('#successMsg').hide();
    $w('#errorMsg').hide();

    $w('#imageUpload').fileType = 'Image';
    $w('#imageUpload').buttonLabel = 'Add a Photo (optional)';

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
        let imageUrl = null;
        if ($w('#imageUpload').value.length > 0) {
          const uploadResult = await $w('#imageUpload').startUpload();
          console.log('Upload result:', JSON.stringify(uploadResult));
          imageUrl = uploadResult.fileUrl;
          console.log('imageUrl to submit:', imageUrl);
        } else {
          console.log('No image selected');
        }
        await submitPost(title, content, imageUrl);
        $w('#titleInput').value = '';
        $w('#contentInput').value = '';
        $w('#imageUpload').reset();
        $w('#successMsg').show();
      } catch (e) {
        $w('#errorMsg').text = 'Submission failed. Please try again.';
        $w('#errorMsg').show();
      } finally {
        $w('#submitBtn').enable();
      }
    });
  });
