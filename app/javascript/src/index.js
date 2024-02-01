import $ from "jquery";
import "./requests.js";
import {
  indexTasks,
  postTask,
  deleteTask,
  markActive,
  markCompleted,
} from "./requests.js";

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
        "' class='task-checkbox' data-id='" +
        task.id +
        "'>\
        </div>"
      );
    });
    $("#tasks").html(htmlString);

    $("#tasks")
      .off("change", ".task-checkbox")
      .on("change", ".task-checkbox", function () {
        var taskId = $(this).data("id");
        handleCheckboxChange(taskId);
      });

    $("#tasks")
      .off("click", ".remove-button")
      .on("click", ".remove-button", function () {
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

function handleCheckboxChange(taskId) {
  markCompleted(taskId, function () {
    getLatestTask();
    console.log("complete");
  });
}

$(function () {
  getLatestTask();
});
