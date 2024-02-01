import $ from "jquery";
import "./requests.js";
import { indexTasks, postTask, deleteTask } from "./requests.js";

function getLatestTask() {
  indexTasks(function (response) {
    var htmlString = response.tasks.map(function (task) {
      return (
        "<div class='col-12 mb-3 p-2 border rounded task' data-id='" +
        task.id +
        "'> \
        " +
        task.content +
        "\
        <button data-id='" +
        task.id +
        "' class='remove-button'>Remove</button>\
        <input type='checkbox' id='checkbox_" +
        task.id +
        "' class='task-checkbox' onchange='handleCheckboxChange(" +
        task.id +
        ")'>\
        </div>"
      );
    });
    $("#tasks").html(htmlString);

    $("#tasks").on("click", ".remove-button", function () {
      var taskId = $(this).data("id");
      handleRemoveClick(taskId);
    });
  });
}

function handleRemoveClick(taskId) {
  deleteTask(taskId, function () {
    getLatestTask();
  });
}
function handleAddTaskClick() {
  console.log("handleAddTaskClick");
  var newTaskContent = $("#newTaskInput").val();
  if (newTaskContent) {
    postTask(newTaskContent, getLatestTask);
    $("#newTaskInput").val("");
  }
}

$(document).on("click", "#addTaskButton", function () {
  console.log("clicked");
  handleAddTaskClick();
});

$(function () {
  getLatestTask();
});
