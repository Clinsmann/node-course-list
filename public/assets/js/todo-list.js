$(document).ready(function () {
    $('form').submit(event => {
        event.preventDefault();
        let type, url, id = event.target.id,
            data = {
                code: $('input[name="code"]').val(),
                title: $('input[name="title"]').val()
            };
        if (!data.code || !data.title) return alert('please fill the form correctly!');
        if (id === "update") {
            type = "PATCH";//"PUT"
            url = `/course/${$('input[name="_id"]').val()}`;
        }
        if (id === "add") {
            type = "POST";
            url = "/course";
        }
        $.ajax({type, url, data, success: () => $(location).attr('href', '/course')});
        return false;
    });
});

function deleteCourse(element, id) {
    $.ajax({
        type: 'DELETE',
        url: `/course/${id}`,
        success: () => location.reload()
    });
}