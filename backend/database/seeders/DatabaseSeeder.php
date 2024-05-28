<?php

namespace Database\Seeders;

use App\Http\Controllers\PaymenetTrancheController;
use App\Models\AbsenceReport;
use App\Models\Admin;
use App\Models\Blog;
use App\Models\ClassRoom;
use App\Models\Course;
use App\Models\Exam;
use App\Models\Grade;
use App\Models\Group;
use App\Models\GroupSubject;
use App\Models\PaymenetTranche;
use App\Models\PreRegistration;
use App\Models\Registration;
use App\Models\Speciality;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use App\Models\User;
use Database\Factories\BlogFactory;
use Database\Factories\GroupFactory;
use Faker\Provider\ar_EG\Payment;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {        
        $classroom_types = ["sciences", "sport", "normale", "musique", "art", "langue", "informatique", "histoire"];
        $specialities = [
            ["science economie", "eco"],
            ["science physique", "pc"],
            ["science svt", "svt"],
            ["sience littéraire", "lit"]
        ];
        $subjects = ["mathématiques", "physique et chimie", "arabe", "français", "anglais", "espagnol", "histoire", "géographie", "biologie", "éducation civique", "musique", "philosophie", "informatique", "économie", "sociologie", "psychologie", "théâtre", "sport", "religions",
        ];

        // pre_reistrations table
        PreRegistration::factory(50)->create();
        
        // stundents table
        Student::factory(300)->create();
        
        // class_rooms table
        for ($i = 1; $i < 100; $i++) {
            ClassRoom::factory()->create([
                'classroom_number' => $i,
                'classroom_type' => $classroom_types[array_rand($classroom_types)]
            ]);
        }
        
        // admins tabel
        Admin::factory(5)->create();
        Admin::factory()->create([
            "email" => "admin@admin.com", 
            "password" => Hash::make("admin@admin.com"),
        ]);

        // blogs tabel
        Blog::factory(15)->create([
            "admin_id" => random_int(0, Admin::all()->count() -1),
        ]);

        // sepcialities tabel
        foreach($specialities as $speciality) {
            Speciality::factory()->create([
                "name" => $speciality[0],
                "code" => $speciality[1],
                "updated_at" => now(),
                "created_at" => now()
            ]);
        }

        // groups tabel
        Group::factory(15)->create([
            "speciality_id" => random_int(0, Speciality::all()->count() -1),
        ]);

        // registrations tabel
        Registration::factory(200)->create([
            'school_year' => 2024,
            'student_id' => random_int(0, Student::all()->count() -1),
            'group_id' => random_int(0, Group::all()->count() -1),
            'created_by' => random_int(0, Admin::all()->count() -1),
        ]);

        // subjects tabel
        foreach($subjects as $subject) {
            Subject::factory()->create([
                "name" => $subject,
            ]);
        }

        // teachers tabel
        Teacher::factory(50)->create();

        // group_subjects tabel
        GroupSubject::factory(20)->create([
            'teacher_id' => random_int(0, Teacher::all()->count() -1),
            'group_id' => random_int(0, Group::all()->count() -1),
            'subject_id' => random_int(0, Subject::all()->count() -1),
        ]);

        // courses tabel
        Course::factory(50)->create([
            'group_subject_id' => random_int(0, GroupSubject::all()->count() -1),
            'class_room_id' => random_int(0, ClassRoom::all()->count() -1),
        ]);

        // absensereports table
        AbsenceReport::factory(200)->create([
            'student_id' => random_int(0, Student::all()->count() -1),
            'course_id' => random_int(0, Course::all()->count() -1),
        ]);

        // payement_tranches tabel
        PaymenetTranche::factory(40)->create([
            'registration_id' => random_int(0, Registration::all()->count() -1),
        ]);

        // exams tabel
        Exam::factory(10)->create([
            "group_subject_id" => random_int(0, GroupSubject::all()->count() -1),
        ]);

        //students tabel
        Grade::factory(100)->create([
            'exam_id' => random_int(0, Exam::all()->count() -1),
            'student_id' => random_int(0, Student::all()->count() -1),
        ]);
    }
}
