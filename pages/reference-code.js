async function getCurrentSuggestionsbyClickedMoodId(mood_id: number) {
  const currentSuggestions = await getSuggestionsByMoodId(1);
  console.log('hearrrrrrrrrr');
  console.log(currentSuggestions[1].name);
  return {
    suggestions: {
      name: currentSuggestions[1].name,
    },
  };
}



key={`mood-${mood.mood_id}`} css={rowStyle}


var elements =
                          document.getElementsByClassName('suggestion');
                        if (elements !== null) {
                          for (var i = elements.length - 1; i > 0; i--) {
                            if (elements[i] !== null) {
                              elements[i].remove();
                            }
                          }



                          const noteResponse = await fetch('/api/note', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    // ADD DATE AND MODE
                    note: note,
                    mode_id: currentClickedMood,
                    csrfToken: props.csrfToken,
                  }),
                });

                const noteResponseBody = await noteResponse.json();

                if ('errors' in noteResponseBody) {
                  setErrors(noteResponseBody.errors);
                  return;
                }

                // If for some reason a page is locked for the user and they need to log in before accessing to that page. We they loge in, the will be directed to the page they wanted to access before log in.

                //const returnTo = router.query.returnTo;
                //console.log('returnTo', returnTo);

                if (
                  returnTo &&
                  !Array.isArray(returnTo) &&
                  // Security: Validate returnTo parameter against valid path
                  // (because this is untrusted user input)
                  /^\/[a-zA-Z0-9-?=]*$/.test(returnTo)
                ) {
                  await router.push(returnTo);
                  return;
                }

                // When the user is registered we want to send her to home page or any page you want.

                // Login worked, clear the errors and redirected to the homepage.

                setErrors([]);
                props.refreshUserProfile();
                await router.push(`/`); // Here I am telling to take the user to the home page.




                createUserMood(
                  1,
                  1,
                  'none',
                  'note',
                  '/images/user_moods/happy.png',
                  new Date(),
                );