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
    console.log(response);

    var htmlString = response.tasks.map(function (task) {
      return (
        "<div class='col-12 mb-3 p-2 border rounded task' data-id='" +
        task.id +
        "'> \
        <div class='task-content" +
        (task.completed ? " completed-task" : "") +
        "'>" +
        task.content +
        "</div>\
        <div class='completion-status'>" +
        (task.completed ? "" : "Incomplete") +
        "</div>\
        <input type='checkbox' id='checkbox_" +
        task.id +
        "' class='task-checkbox custom-checkbox' data-id='" +
        task.id +
        "'" +
        (task.completed ? " checked" : "") +
        ">\
        <button data-id='" +
        task.id +
        "' class='remove-button'>Remove</button>\
        </div>"
      );
    });
    $("#tasks").html(htmlString);

    $("#tasks")
      .off("change", ".task-checkbox")
      .on("change", ".task-checkbox", function () {
        var taskId = $(this).data("id");
        var goToChecked = $(this).prop("checked");
        handleCheckboxChange(taskId, goToChecked);
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

function handleCheckboxChange(taskId, goToChecked) {
  console.log(taskId, goToChecked);
  var $taskContent = $(".task[data-id='" + taskId + "'] .task-content");

  if (goToChecked) {
    markCompleted(taskId, function () {
      getLatestTask();
      console.log("complete");
      $taskContent.addClass("completed-task");
      console.log("Task element after adding class:", $taskContent);
    });
  } else {
    markActive(taskId, function () {
      getLatestTask();
      console.log("active");
      $taskContent.removeClass("completed-task");
      console.log("active", $taskContent);
    });
  }
}

$(function () {
  getLatestTask();
});
